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

    // Pre-allocate buffers for rendering
    const pointsBuffer = useRef(new Float32Array(count * 3));
    const linePositionsBuffer = useRef(new Float32Array(count * count * 6));

    useFrame((state) => {
        const { pointer } = state;
        const mouseX = (pointer.x * viewport.width) / 2;
        const mouseY = (pointer.y * viewport.height) / 2;

        const positions = pointsRef.current.geometry.attributes.position.array;
        let lineIdx = 0;
        const linePos = linePositionsBuffer.current;

        for (let i = 0; i < count; i++) {
            const node = nodes[i];
            
            // Move nodes
            node.position.add(node.velocity);

            // Bounce off boundaries with margin
            if (Math.abs(node.position.x) > viewport.width) node.velocity.x *= -1;
            if (Math.abs(node.position.y) > viewport.height) node.velocity.y *= -1;

            // Mouse attraction (optimized with distance squared)
            const dx = mouseX - node.position.x;
            const dy = mouseY - node.position.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 25) { // 5 unit radius
                const dist = Math.sqrt(distSq);
                node.position.x += (dx / dist) * 0.01;
                node.position.y += (dy / dist) * 0.01;
            }

            positions[i * 3] = node.position.x;
            positions[i * 3 + 1] = node.position.y;
            positions[i * 3 + 2] = node.position.z;

            // Connect nearby nodes (optimized double loop)
            for (let j = i + 1; j < count; j++) {
                const other = nodes[j];
                const dxO = node.position.x - other.position.x;
                const dyO = node.position.y - other.position.y;
                const dzO = node.position.z - other.position.z;
                const distToOtherSq = dxO * dxO + dyO * dyO + dzO * dzO;
                
                if (distToOtherSq < 16) { // 4 unit distance
                    linePos[lineIdx++] = node.position.x;
                    linePos[lineIdx++] = node.position.y;
                    linePos[lineIdx++] = node.position.z;
                    linePos[lineIdx++] = other.position.x;
                    linePos[lineIdx++] = other.position.y;
                    linePos[lineIdx++] = other.position.z;
                }
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        if (linesRef.current) {
            const lineAttr = linesRef.current.geometry.attributes.position;
            lineAttr.array.set(linePos.subarray(0, lineIdx));
            lineAttr.count = lineIdx / 3;
            lineAttr.needsUpdate = true;
            linesRef.current.geometry.computeBoundingSphere();
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
                        array={pointsBuffer.current}
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
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={0}
                        array={linePositionsBuffer.current}
                        itemSize={3}
                    />
                </bufferGeometry>
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
