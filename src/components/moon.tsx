import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import moon from '../assets/moon/moon.jpg'
import bump from '../assets/moon/moon_normal.png'

const Moon: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor('#010101', 1)

        camera.position.z = 5;

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
        const sphere = new THREE.Mesh(sphereGeometry, material1);
        scene.add(sphere);

        // Create a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1); // Set the initial position of the light
        scene.add(directionalLight);

        // Set the position and target of the light to point at the moon
        directionalLight.position.set(20, 5, 5); // Adjust the position of the light
        directionalLight.target = sphere; // Set the target of the light to the moon

        // // Add an ambient light to the scene
        // const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        // scene.add(ambientLight);

        // Enable shadows for the moon and the directional light
        sphere.castShadow = true;
        directionalLight.castShadow = true;

        // Set shadow properties for the directional light
        directionalLight.shadow.mapSize.width = 512; // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.5; // default
        directionalLight.shadow.camera.far = 500; // default


        const animate = () => {
            requestAnimationFrame(animate);

            sphere.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Cleanup logic here if needed
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Moon;
