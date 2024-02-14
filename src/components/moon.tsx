import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import moon from '../assets/moon/moon.jpg'
import bump from '../assets/moon/moon_normal.png'

const Moon: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sphereRef = useRef<any>(null);
    const mouseRef = useRef<any>(null);
    const sceneRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const raycasterRef = useRef<any>(null);
    const previousMousePosition = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor('#010101', 1)

        cameraRef.current.position.z = 5;

        // Create a sphere geometry
        const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);

        // Load a texture
        const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load(moon);
        const texture = textureLoader.load(
            moon.src,
            // onLoad callback
            function(texture) {
                console.log('Texture loaded successfully:', texture);
            },
            // onProgress callback
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // onError callback
            function(error) {
                console.error('Error loading texture:', error);
            }
        );

        // Load a bump map
        const bumpMap = textureLoader.load(
            bump.src,
            // onLoad callback
            function(texture) {
                console.log('Texture loaded successfully:', texture);
            },
            // onProgress callback
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // onError callback
            function(error) {
                console.error('Error loading texture:', error);
            }
        );

        // Create a material
        const material1 = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: bumpMap,
            bumpScale: 0.1 // Adjust the bumpiness here
        });

        // Create a mesh with the geometry and material
        sphereRef.current = new THREE.Mesh(sphereGeometry, material1);
        sceneRef.current.add(sphereRef.current);

        // Create a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1); // Set the initial position of the light
        sceneRef.current.add(directionalLight);

        // Set the position and target of the light to point at the moon
        directionalLight.position.set(20, 5, 5); // Adjust the position of the light
        directionalLight.target = sphereRef.current; // Set the target of the light to the moon

        // // Add an ambient light to the scene
        // const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        // scene.add(ambientLight);

        // Enable shadows for the moon and the directional light
        sphereRef.current.castShadow = true;
        directionalLight.castShadow = true;

        // Set shadow properties for the directional light
        directionalLight.shadow.mapSize.width = 512; // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.5; // default
        directionalLight.shadow.camera.far = 500; // default

        // Raycaster
        raycasterRef.current = new THREE.Raycaster();
        mouseRef.current = new THREE.Vector2();



        const animate = () => {
            requestAnimationFrame(animate);

            sphereRef.current.rotation.y += 0.0005;
            

            renderer.render(sceneRef.current, cameraRef.current);
        };

        animate();


        // canvasRef.current.addEventListener('mousedown', handleMouseDown);
        // canvasRef.current.addEventListener('mousemove', handleMouseMove);
        // canvasRef.current.addEventListener('mouseup', handleMouseUp);
    
        // Resize handling
        function handleResize() {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    
        window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                // canvasRef.current?.removeEventListener('mousedown', handleMouseDown);
                // canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
                // canvasRef.current?.removeEventListener('mouseup', handleMouseUp);
                // canvasRef.current?.removeChild(renderer.domElement);
            };
        }, []);

    
        // Mouse event handlers
        function handleMouseDown(event:any) {
            console.log('mouse')
            isDragging.current = true;
            previousMousePosition.current = {
            x: event.clientX,
            y: event.clientY,
            };
        }

        function handleMouseMove(event:any) {
            if (isDragging.current) {
              const deltaMove = {
                x: event.clientX - previousMousePosition.current.x,
                y: event.clientY - previousMousePosition.current.y,
              };
      
              sphereRef.current.rotation.y += deltaMove.x * 0.001;
      
              previousMousePosition.current = {
                x: event.clientX,
                y: event.clientY,
              };
            }
      
            // Update mouse position for raycasting
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
            // Perform raycasting
            raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
            const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);
      
            // Change cursor style if intersecting with the sphere
            if (intersects.length > 0) {
              document.body.style.cursor = 'grab';
            } else {
              document.body.style.cursor = 'auto';
            }
          }
      

        function handleMouseUp() {
            isDragging.current = false;
        }
    

    return <canvas onPointerDown={handleMouseDown} onPointerMove={handleMouseMove} onPointerUp={handleMouseUp} ref={canvasRef} />;
};

export default Moon;
