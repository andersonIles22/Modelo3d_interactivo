import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const url_ground_floor='../src/assets/project/ground_floor/Manposteria_planta_baja_v2.glb'

const exampleOne= async ()=>{
    const canvas= document.querySelector('#figures')
    const renderer=new THREE.WebGLRenderer({canvas});
    const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
    const scene= new THREE.Scene();
    const axesHelper= new THREE.AxesHelper(7)
    camera.position.set(0,1.25,5)
    
    scene.background=new THREE.Color('white');




    // configuramos para que las lineas de coordenadas x,y,z sean visibles en el navegador
    axesHelper.setColors(new THREE.Color('#FF0000'),new THREE.Color('#0000FF'),new THREE.Color('#FF8C00'))

    scene.add(axesHelper);
    //Establecer el modo orbitar
    const controls= new OrbitControls(camera,canvas)
    //Esteblecer diferentes dimesiones para los cajas
    const boxes={
        boxOne:[2,1,2],
        boxTwo:[1,2,1],
        boxThree:[2,2,2],
        boxFour:[1,1,1]
    };
    

    const  manyBoxes=(axis,color,x)=>{
        const material=new THREE.MeshPhongMaterial({color:color});
        const geometry=new THREE.BoxGeometry(axis[0],axis[1],axis[2]);

        const cube= new THREE.Mesh(geometry,material);
        scene.add(cube);
        cube.position.x=x;
        cube.position.y=-2
        
        return cube;
    }

    manyBoxes(boxes.boxOne,0x44aa88,-2),
    manyBoxes(boxes.boxTwo,0x884aa,0),
    manyBoxes(boxes.boxThree,0xaa8844,2)
    manyBoxes(boxes.boxFour,0x8844AA,4)

    // gltfloader ground floor of project
    const loader=new GLTFLoader();
    let gltf_result;
    try {
        const gltf= await loader.loadAsync(url_ground_floor);
        const gltf_ground_floor=gltf.scene
        scene.add(gltf_ground_floor);
        gltf_ground_floor.position.y=1.25
        gltf_result=gltf_ground_floor
    } catch (error) {
        console.error('Warning:', error.message)
    }


    
    // Añadiendo Inercia
    controls.enableDamping=true;
    controls.dampingFactor=0.009;
    // Reset el estado de camara
    const resetStateCamera=()=>{        
        controls.enableDamping=false;
        controls.update();
        controls.reset();
        controls.enableDamping=true;
    };
    buttonCenterCamera.addEventListener('click',resetStateCamera);
    
  
    // Configuramos la iluminación
    
    const frontdLight = new THREE.DirectionalLight(0xFFFFFF,1)
    frontdLight.position.set(0,8,8)
    scene.add( frontdLight );
    
    const backDlight = new THREE.DirectionalLight(0xFFFFFF,0.5)
    backDlight.position.set(0,8,-8)
    scene.add( backDlight );

    const rightDlight = new THREE.DirectionalLight(0xFFFFFF,0.5)
    rightDlight.position.set(8,8,0)
    scene.add( rightDlight );

    const leftDlight = new THREE.DirectionalLight(0xFFFFFF,0.5)
    leftDlight.position.set(-8,8,0)
    scene.add( leftDlight );

    // Ejecutamos una función que renderiza el modelo de manera ciclica
    const animation= (time)=>{
        time*=0.001;
        
        if(resizeRenderToDisplaySize(renderer)){
            const canvas=renderer.domElement;
            camera.aspect=canvas.clientWidth/canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

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
