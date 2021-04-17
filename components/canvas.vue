<template>
    <div ref="canvas"
         class="canvas">
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {sha256} from 'js-sha256';
    import * as THREE from 'three';

    export default {
        components: {
          
        },
        data() {
            return {
                canvasSize: {
                    width: 0,
                    height: 0
                },
                distance: 500,
                renderer: '',
                scene: '',
                menuScene: '',
                camera: '',

                fetchedCards: [],
                playerCards: [],
                playerTeam: []
            };
        },

        computed: {
            ...mapGetters('cards', ['getCards']),
        },

        mounted() {
            this.canvasSize.width = Math.min(window.innerWidth, (window.innerHeight - 128) * 16/9);
            this.canvasSize.height = this.canvasSize.width * 9/16;
            this.initThree();
            window.addEventListener('resize', this.updateSize);
        },

        beforeDestroy() {
            console.log(111);
        },
      
        methods: {
            ...mapActions('cards', ['fetchCard']),

            initThree() {
                this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
                this.renderer.setSize(this.canvasSize.width, this.canvasSize.width*9/16);

                this.camera = new THREE.PerspectiveCamera(30, 16/9, 1, 10000);
                // this.camera.position.x = this.distance;
                // this.camera.position.y = this.distance;
                this.camera.position.z = this.distance;
                this.camera.lookAt(0, 0, 0);

                this.scene = new THREE.Scene();

                this.drawGrid();
                this.fetchCards(6);
                this.drawMenu();
                this.animate();

                this.$refs.canvas.appendChild(this.renderer.domElement);
            },
            drawMenu() {
                const fontLoader = new THREE.FontLoader();
                fontLoader.load('./fonts/helvetiker_bold.typeface.json', text => { 
                    const textGeo = new THREE.TextGeometry('GO', {
                        font: text,
                        size: 20,
                        height: 2,
                        curveSegments: 12
                    });
                    const color = new THREE.Color(0xf54040);
                    const textMaterial = new THREE.MeshBasicMaterial({color: color});
                    const textNewGame = new THREE.Mesh(textGeo, textMaterial);
                    this.scene.add(textNewGame);
                    this.renderer.render(this.scene, this.camera);
                });
            },
            drawGrid() {
                const materialRed = new THREE.LineBasicMaterial({color: 0xff0000});
                const materialGreen = new THREE.LineBasicMaterial({color: 0x00ff00});
                const materialBlue = new THREE.LineBasicMaterial({color: 0x0000ff});
                const points = {
                    x: [],
                    y: [],
                    z: []
                };
                points.x.push(new THREE.Vector3(-10000, 0, 0));
                points.x.push(new THREE.Vector3(10000, 0, 0));
                points.y.push(new THREE.Vector3(0, -10000, 0));
                points.y.push(new THREE.Vector3(0, 10000, 0));
                points.z.push(new THREE.Vector3(0, 0, -10000));
                points.z.push(new THREE.Vector3(0, 0, 10000));

                const geometryX = new THREE.BufferGeometry().setFromPoints(points.x);
                const lineX = new THREE.Line(geometryX, materialRed);
                
                const geometryY = new THREE.BufferGeometry().setFromPoints(points.y);
                const lineY = new THREE.Line(geometryY, materialGreen);
                
                const geometryZ = new THREE.BufferGeometry().setFromPoints(points.z);
                const lineZ = new THREE.Line(geometryZ, materialBlue);

                this.scene.add(lineX);
                this.scene.add(lineY);
                this.scene.add(lineZ);
                this.renderer.render(this.scene, this.camera);
            },
            async fetchCards(n) {
                const geometry = new THREE.PlaneGeometry(45, 70, 5);
                for (let i=0; i<n; i++) {
                    const response = await fetch(`https://api.jikan.moe/v3/character/${i+497}`);
                    const data = await response.json();
                    this.fetchedCards.push(data);
                    this.fromFetchedCardsToPlayerCards(data);

                    const texture = new THREE.TextureLoader().load(data.image_url);
                    const material = new THREE.MeshBasicMaterial({map: texture});
                    const card = new THREE.Mesh(geometry, material);

                    card.position.set((i-2) * 50, -60, 1);
                    this.scene.add(card);

                    this.renderer.render(this.scene, this.camera);
                }
            },
            fromFetchedCardsToPlayerCards(data) {
                const code = sha256.array(data.mal_id.toString());
                const item = {
                    id: data.mal_id,
                    name: data.name,
                    image: data.image_url,
                    anime: data.animeography[0]?.name || 'unknown',
                    hp: code[0],
                    attack: code[1],
                    defence: code[2],
                    initiative: code[3]
                };
                this.playerCards.push(item);
            },
            async fetchCardFromID(id) {
                const response = await fetch(`https://api.jikan.moe/v3/character/${id}`);
                const data = await response.json();
                this.fetchedCards.push(data);
            },
            animate() {
                this.renderer.render(this.scene, this.camera);
                requestAnimationFrame(this.animate);
            },
            updateSize() {
                this.canvasSize.width = Math.min(window.innerWidth, (window.innerHeight - 128) * 16/9);
                this.canvasSize.height = this.canvasSize.width * 9/16;
                this.renderer.setSize(this.canvasSize.width, this.canvasSize.width*9/16);
            },
        },
    };
</script>

<style lang='scss'>
    .canvas {
        width: 100%;
        height: 100%;
        background: #eee;
    }
</style>
