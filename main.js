import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const exampleOne= ()=>{
    const canvas= document.querySelector('#figures')
    const renderer=new THREE.WebGLRenderer({canvas});
    const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
    const scene= new THREE.Scene();

    camera.position.z=6;


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


        // cubes.forEach((cube,ndx)=>{
        //     const speed=0.25+ndx* .1;
        //     const rot=time*speed;
        //     cube.rotation.x=rot;
        //     cube.rotation.y=rot;
        // })
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

///         Tienes que hacer orbitar con el mouse 