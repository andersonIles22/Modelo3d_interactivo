import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import helmetUrl from '../assets/models/helmet_source.glb?url'

const exampleOne= async ()=>{
    const canvas= document.querySelector('#figures')
    const renderer=new THREE.WebGLRenderer({canvas});
    const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
    const scene= new THREE.Scene();
    const axesHelper= new THREE.AxesHelper(7)
    camera.position.set(0,1.25,5)


    axesHelper.setColors(new THREE.Color('#FF0000'),new THREE.Color('#0000FF'),new THREE.Color('#FF8C00'))

    scene.add(axesHelper);
    const controls= new OrbitControls(camera,canvas)
    //Esteblecer diferentes dimesiones para los cajas
    const boxes={
        boxOne:[2,1,2],
        boxTwo:[1,2,1],
        boxThree:[2,2,2]
    };

    const  manyBoxes=(axis,color,x)=>{
        const material=new THREE.MeshPhongMaterial({color:color});
        const geometry=new THREE.BoxGeometry(axis[0],axis[1],axis[2]);

        const cube= new THREE.Mesh(geometry,material);
        scene.add(cube);
        cube.position.x=x;

        return cube;
    }

    manyBoxes(boxes.boxOne,0x44aa88,-2),
    manyBoxes(boxes.boxTwo,0x884aa,0),
    manyBoxes(boxes.boxThree,0xaa8844,2)

    // gltfloader helmet
    const loader=new GLTFLoader();
    let gltf_result;
    try {
        const gltf= await loader.loadAsync(helmetUrl);
        const gltf_helmet=gltf.scene
        scene.add(gltf_helmet);
        gltf_helmet.position.y=1.25
        gltf_result=gltf_helmet
    } catch (error) {
        console.error('Warning:', error.message)
    }


    

    // Configuramos la iluminación
    const light= new THREE.DirectionalLight(0xFFFFFF,3)
    light.position.set(-1,2,4);
    scene.add(light)

    const otherlight= new THREE.DirectionalLight(0xFFFFFF,3)
    otherlight.position.set(1,-2,-4);
    scene.add(otherlight)
    // Ejecutamos una función que renderiza el modelo de manera ciclica
    const animation= (time)=>{
        time*=0.001;
        
        if(resizeRenderToDisplaySize(renderer)){
            const canvas=renderer.domElement;
            camera.aspect=canvas.clientWidth/canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        if (gltf_result){
            gltf_result.rotation.y=time;
        }
        controls.enableDamping=true;
        controls.dampingFactor=0.009;
        controls.update();
        renderer.render(scene,camera)
        requestAnimationFrame(animation)
    }

    const resizeRenderToDisplaySize=(renderer)=>{
        const canvas= renderer.domElement;
        const width=canvas.clientWidth;
        const height=canvas.clientHeight;

        const needResize=canvas.width!==width||canvas.height!==height;
        if(needResize){
            renderer.setSize(width,height,false)
        }

        return needResize
    };

    requestAnimationFrame(animation)
};
exampleOne()
