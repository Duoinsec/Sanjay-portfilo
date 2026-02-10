import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralBackground = () => {
    const { viewport } = useThree();
    const count = 100;
    const linesRef = useRef();
    const pointsRef = useRef();

    // Create random nodes
    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * viewport.width * 2,
                    (Math.random() - 0.5) * viewport.height * 2,
                    (Math.random() - 0.5) * 10
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.01
                ),
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    // Points geometry data
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        return positions;
    }, [count]);

    useFrame((state) => {
        const { pointer } = state;
        const mouseX = (pointer.x * viewport.width) / 2;
        const mouseY = (pointer.y * viewport.height) / 2;

        const positions = pointsRef.current.geometry.attributes.position.array;
        const linePositions = [];

        nodes.forEach((node, i) => {
            // Move nodes
            node.position.add(node.velocity);

            // Bounce off boundaries
            if (Math.abs(node.position.x) > viewport.width) node.velocity.x *= -1;
            if (Math.abs(node.position.y) > viewport.height) node.velocity.y *= -1;

            // Mouse attraction (subtle)
            const dx = mouseX - node.position.x;
            const dy = mouseY - node.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 5) {
                node.position.x += dx * 0.01;
                node.position.y += dy * 0.01;
            }

            positions[i * 3] = node.position.x;
            positions[i * 3 + 1] = node.position.y;
            positions[i * 3 + 2] = node.position.z;

            // Connect nearby nodes
            for (let j = i + 1; j < nodes.length; j++) {
                const distToOther = node.position.distanceTo(nodes[j].position);
                if (distToOther < 4) {
                    linePositions.push(
                        node.position.x, node.position.y, node.position.z,
                        nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                    );
                }
            }
        });

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        if (linesRef.current) {
            const lineGeom = linesRef.current.geometry;
            lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        }
    });

    return (
        <group>
            {/* Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particlesPosition}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    color="#00f2ff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            {/* Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    color="#bc13fe"
                    transparent
                    opacity={0.15}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
};

export default NeuralBackground;
