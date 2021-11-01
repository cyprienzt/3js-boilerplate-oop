// importing the three.js library
import * as THREE from 'three'
// orbit contols help us to interact with the object displayed
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// exporting the whole class so we can import other modules
export default class Sketch {

    // the constructor with initialisations
    constructor(options) {

        // getting the container from html file, where will be selected using the getElementByID method
        // on init bellow we specify the method to select our div
        this.container = options.domElement

        // sizes of the container 
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight

        // init the camera based on container sizes and defining the position on z axis 
        this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 0.01, 10 )
        this.camera.position.z = 0.3

        // init the three scene
        this.scene = new THREE.Scene()

        // init the renderer and appending to container
        this.renderer = new THREE.WebGLRenderer( { antialias: true } )
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.container.appendChild( this.renderer.domElement )

        // for mouse interaction
        this.controls = new OrbitControls( this.camera, this.renderer.domElement )

        // init. the time value and the functions defined below
        this.time = 0
        this.resize()
        this.addObjects()
        this.render()
        this.setupResize()
        
    }

    // function for responsiveness
    resize() {
        this.width = this.container.offsetWidth
        this.height = this.container.offsetHeight
        this.renderer.setSize( this.width, this.height )
        this.camera.aspect = this.width/this.height
        this.camera.updateProjectionMatrix()
    }

    // event listener for the function above
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    // function for our objects
    addObjects() {

        // the geometry used , in our case a box
        this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )

        // material used for our geometry
        this.material = new THREE.MeshNormalMaterial()

        // combining into a mesh the geometry and the material from above
        this.mesh = new THREE.Mesh( this.geometry, this.material )

        // adding to our scene the entire mesh
        this.scene.add( this.mesh )
    }

    // rendering the magic
    render() {

        // increasing the time by the following value
        this.time += 0.05

        // rotation for x and y axis
        this.mesh.rotation.x = this.time / 2000
        this.mesh.rotation.y = this.time / 1000

        // rendering the scene and the camera
        this.renderer.render( this.scene, this.camera )

        // adding our render to animation frame
        requestAnimationFrame( this.render.bind(this) )
    }
}

// init. the class and selecting the container div from html file
new Sketch({
    domElement: document.getElementById('container')
})