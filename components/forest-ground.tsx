import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Cloud, Html } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { FC } from "react";

interface TreeProps {
  position: [number, number, number];
  trunkHeight?: number;
  trunkRadius?: number;
  leafColor?: string;
  scale?: number;
  searchName?: string;
  isSupabaseTree?: boolean;
  treeName?: string;
  treeAge?: number;
  treeStage?: string;
  donationAmount?: number;
}

const Tree: FC<TreeProps> = ({
  position,
  scale = 1,
  searchName = "",
  isSupabaseTree = false,
  treeName: propTreeName,
  treeAge: propTreeAge,
  treeStage: propTreeStage,
  donationAmount: propDonationAmount,
}) => {
  const [treePosition, setTreePosition] =
    useState<[number, number, number]>(position);
  const [isSelected, setIsSelected] = useState(false);

  // Use useMemo to generate random values once and preserve them
  const treeData = useMemo(() => {
    // If this is a Supabase tree, use provided values
    if (isSupabaseTree) {
      return {
        treeType: Math.floor(Math.random() * 3), // Still randomize tree type
        treeName: propTreeName || "Unknown",
        treeAge: propTreeAge || 1,
        treeStage: propTreeStage || "Seedling",
        donationAmount: propDonationAmount || 10,
        // Make Supabase trees have a slightly unique color to distinguish them
        treeColor: new THREE.Color("#3D7A37").getStyle(),
        trunkColor: new THREE.Color("#5A4B32").getStyle(),
      };
    }

    // Random tree type (0-2)
    const treeType = Math.floor(Math.random() * 3);

    // Random human names for trees
    const humanNames = [
      "Emma",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "William",
      "Sophia",
      "James",
      "Isabella",
      "Oliver",
      "Charlotte",
      "Benjamin",
      "Amelia",
      "Elijah",
      "Mia",
      "Lucas",
      "Harper",
      "Mason",
      "Evelyn",
      "Logan",
    ];
    const treeName = humanNames[Math.floor(Math.random() * humanNames.length)];

    // Add tree age (in months, 1-60)
    const treeAge = Math.floor(Math.random() * 60) + 1;

    // Determine stage based on age
    let treeStage = "Seedling";
    if (treeAge > 36) treeStage = "Mature";
    else if (treeAge > 12) treeStage = "Young";

    // Random donation amount ($10-500)
    const donationAmount = Math.floor(Math.random() * 491) + 10;

    // Randomize colors slightly
    const baseTreeColor = "#2D5A27";
    const baseTrunkColor = "#4A3B22";
    const colorVariation = () => (Math.random() - 0.5) * 0.2;

    const treeColor = new THREE.Color(baseTreeColor)
      .offsetHSL(
        colorVariation(),
        colorVariation() * 0.3,
        colorVariation() * 0.2
      )
      .getStyle();
    const trunkColor = new THREE.Color(baseTrunkColor)
      .offsetHSL(0, 0, colorVariation() * 0.2)
      .getStyle();

    return {
      treeType,
      treeName,
      treeAge,
      treeStage,
      donationAmount,
      treeColor,
      trunkColor,
    };
    // Empty dependency array ensures this runs once on mount
    // Include isSupabaseTree to recalculate if this property changes
  }, [
    isSupabaseTree,
    propTreeName,
    propTreeAge,
    propTreeStage,
    propDonationAmount,
  ]);

  const {
    treeType,
    treeName,
    treeAge,
    treeStage,
    donationAmount,
    treeColor,
    trunkColor,
  } = treeData;

  // Check if this tree matches the search term
  useEffect(() => {
    if (
      searchName &&
      treeName.toLowerCase().includes(searchName.toLowerCase())
    ) {
      setIsSelected(true);
    } else if (searchName) {
      setIsSelected(false);
    }
  }, [searchName, treeName]);

  // Handle click on tree
  const handleTreeClick = (e: any) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const renderTreeType0 = () => (
    // Tall pine tree
    <>
      <mesh position={[0, 1.5, 0]} onClick={handleTreeClick}>
        <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.8, 0]} onClick={handleTreeClick}>
        <coneGeometry args={[1.4, 3.5, 8]} />
        <meshStandardMaterial color={treeColor} />
      </mesh>
      <mesh position={[0, 3.8, 0]} onClick={handleTreeClick}>
        <coneGeometry args={[1, 2.5, 8]} />
        <meshStandardMaterial color={treeColor} />
      </mesh>
      <mesh position={[0, 4.5, 0]} onClick={handleTreeClick}>
        <coneGeometry args={[0.6, 1.5, 8]} />
        <meshStandardMaterial color={treeColor} />
      </mesh>
    </>
  );

  const renderTreeType1 = () => (
    // Bushy tree
    <>
      <mesh position={[0, 1, 0]} onClick={handleTreeClick}>
        <cylinderGeometry args={[0.25, 0.35, 2, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.8} />
      </mesh>
      <group position={[0, 2.5, 0]}>
        <mesh onClick={handleTreeClick}>
          <sphereGeometry args={[1.2, 8, 8]} />
          <meshStandardMaterial color={treeColor} />
        </mesh>
        <mesh position={[0, 0.8, 0]} onClick={handleTreeClick}>
          <sphereGeometry args={[0.9, 8, 8]} />
          <meshStandardMaterial color={treeColor} />
        </mesh>
        <mesh position={[0, -0.8, 0]} onClick={handleTreeClick}>
          <sphereGeometry args={[1.1, 8, 8]} />
          <meshStandardMaterial color={treeColor} />
        </mesh>
      </group>
    </>
  );

  const renderTreeType2 = () => (
    // Wide pine tree
    <>
      <mesh position={[0, 1.2, 0]} onClick={handleTreeClick}>
        <cylinderGeometry args={[0.3, 0.4, 2.4, 8]} />
        <meshStandardMaterial color={trunkColor} roughness={0.8} />
      </mesh>
      <group position={[0, 2, 0]}>
        {[0, 1, 2].map((layer) => (
          <mesh
            key={layer}
            position={[0, layer * 0.8, 0]}
            onClick={handleTreeClick}
          >
            <coneGeometry args={[1.8 - layer * 0.4, 1.2, 8]} />
            <meshStandardMaterial color={treeColor} />
          </mesh>
        ))}
      </group>
    </>
  );

  // Calculate the height for the label based on tree type
  const labelHeight = treeType === 0 ? 6 : treeType === 1 ? 4.5 : 4;

  return (
    <group position={treePosition} scale={[scale, scale, scale]}>
      {treeType === 0 && renderTreeType0()}
      {treeType === 1 && renderTreeType1()}
      {treeType === 2 && renderTreeType2()}

      {/* Only show the label when the tree is selected */}
      {isSelected && (
        <Html
          position={[0, labelHeight, 0]}
          center
          zIndexRange={[0, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: isSupabaseTree
                ? "rgba(34, 139, 34, 0.85)"
                : "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              transform: "scale(1)",
              transformOrigin: "center",
              minWidth: "120px",
              border: isSupabaseTree
                ? "2px solid rgba(255, 255, 255, 0.5)"
                : "none",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "4px" }}>
              {treeName} {isSupabaseTree && "⭐"}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Age: {treeAge} {treeAge === 1 ? "month" : "months"}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Stage: {treeStage}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Donation: ${donationAmount}
            </div>
            {isSupabaseTree && (
              <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
                Real Donor Tree!
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

const Flower: FC<{ position: [number, number, number] }> = ({ position }) => {
  const colors = ["#FF69B4", "#FF1493", "#FFC0CB", "#FFB6C1", "#FF00FF"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={randomColor} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

const Grass: FC<{ position: [number, number, number] }> = ({ position }) => {
  const height = 0.2 + Math.random() * 0.3;
  const greenShades = ["#7CFC00", "#90EE90", "#32CD32", "#228B22", "#006400"];
  const color = greenShades[Math.floor(Math.random() * greenShades.length)];

  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[0.05, height, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Rock: FC<{ position: [number, number, number]; scale: number }> = ({
  position,
  scale,
}) => {
  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#808080" roughness={0.8} />
    </mesh>
  );
};

const River: FC = () => {
  const riverRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (riverRef.current) {
      const geometry = riverRef.current.geometry as THREE.BufferGeometry;
      const positionAttribute = geometry.getAttribute("position");

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const z = positionAttribute.getZ(i);

        // Add gentle waves
        const wave = Math.sin(x * 0.5) * 0.1 + Math.cos(z * 0.5) * 0.1;
        positionAttribute.setY(i, wave);
      }

      positionAttribute.needsUpdate = true;
    }
  }, []);

  return (
    <mesh
      ref={riverRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.8, 0]}
    >
      <planeGeometry args={[10, 40, 20, 20]} />
      <meshStandardMaterial
        color="#4169E1"
        transparent={true}
        opacity={0.8}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
};

const NatureLand: FC<{
  treeCount: number;
  searchName: string;
  supabaseTrees: any[];
}> = ({ treeCount, searchName, supabaseTrees = [] }) => {
  const [treePositions, setTreePositions] = useState<
    [number, number, number][]
  >([]);

  // Generate positions for elements
  useEffect(() => {
    // Generate trees with dynamic count
    const newTreePositions: [number, number, number][] = Array(treeCount)
      .fill(0)
      .map(() => [Math.random() * 80 - 40, 0, Math.random() * 80 - 40]);

    setTreePositions(newTreePositions);
  }, [treeCount]);

  // Generate positions for Supabase trees (clustered in a special area)
  const supabaseTreePositions = useMemo(() => {
    return supabaseTrees.map((_, index) => {
      // Create a special area for donated trees
      // Put them in a nice pattern near the center
      const angle = (index / supabaseTrees.length) * Math.PI * 2;
      const radius = 15 + Math.random() * 5; // Distance from center
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return [x, 0, z] as [number, number, number];
    });
  }, [supabaseTrees]);

  // Generate many more flowers for a dense meadow
  const flowerPositions: [number, number, number][] = Array(200)
    .fill(0)
    .map(() => [Math.random() * 80 - 40, 0, Math.random() * 80 - 40]);

  // Generate grass patches everywhere
  const grassPositions: [number, number, number][] = Array(2000)
    .fill(0)
    .map(() => [Math.random() * 90 - 45, 0, Math.random() * 90 - 45]);

  // Generate more rocks scattered throughout
  const rockPositions = Array(30)
    .fill(0)
    .map(() => ({
      position: [Math.random() * 80 - 40, -0.5, Math.random() * 80 - 40] as [
        number,
        number,
        number
      ],
      scale: Math.random() * 0.5 + 0.3,
    }));

  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.6} />
      {/* Directional light to simulate sunlight */}
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <hemisphereLight args={["#87CEEB", "#90EE90", 0.6]} />

      {/* Land with grass texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color="#7CFC00"
          roughness={0.8}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* River flowing through the scene */}
      <River />

      {/* Dense grass coverage */}
      {grassPositions.map((position, index) => (
        <Grass key={`grass-${index}`} position={position} />
      ))}

      {/* Render multiple trees with varying heights and colors */}
      {treePositions.map((position, index) => (
        <Tree
          key={`tree-${index}`}
          position={position}
          scale={0.8 + Math.random() * 0.5}
          searchName={searchName}
        />
      ))}

      {/* Render Supabase trees */}
      {supabaseTrees.map((tree, index) => (
        <Tree
          key={`supabase-tree-${index}`}
          position={supabaseTreePositions[index] || [0, 0, 0]}
          scale={1.2} // Make them slightly larger
          searchName={searchName}
          isSupabaseTree={true}
          treeName={tree.name}
          treeAge={Math.max(
            1,
            Math.floor(
              (new Date().getTime() - new Date(tree.created_at).getTime()) /
                (30 * 24 * 60 * 60 * 1000)
            )
          )} // Age in months
          treeStage={
            (new Date().getTime() - new Date(tree.created_at).getTime()) /
              (30 * 24 * 60 * 60 * 1000) >
            12
              ? "Young"
              : "Seedling"
          }
          donationAmount={tree.amount}
        />
      ))}

      {/* Add flowers scattered around */}
      {flowerPositions.map((position, index) => (
        <Flower key={`flower-${index}`} position={position} />
      ))}

      {/* Add rocks */}
      {rockPositions.map((rock, index) => (
        <Rock
          key={`rock-${index}`}
          position={rock.position}
          scale={rock.scale}
        />
      ))}

      {/* Add clouds */}
      <Cloud position={[-10, 15, -10]} args={[3, 2]} />
      <Cloud position={[10, 12, 0]} args={[4, 2]} />
      <Cloud position={[0, 10, 10]} args={[3, 2]} />
      <Cloud position={[-20, 18, 5]} args={[5, 2]} />
      {/* <Cloud position={[15, 14, -15]} args={[4, 3]} />
      <Cloud position={[-5, 16, -25]} args={[3, 2]} />
      <Cloud position={[25, 13, 10]} args={[6, 2]} />
      <Cloud position={[-15, 11, 20]} args={[4, 2]} />
      <Cloud position={[5, 17, 30]} args={[5, 3]} />
      <Cloud position={[30, 15, -5]} args={[3, 2]} /> */}
    </>
  );
};

const ForestScene: FC<{
  treeCount: number;
  searchName: string;
  supabaseTrees: any[];
}> = ({ treeCount, searchName = "", supabaseTrees = [] }) => {
  return (
    <div style={{ height: "100vh", width: "100vw", zIndex: 10 }}>
      <Canvas camera={{ position: [15, 10, 15], fov: 60 }} shadows>
        <Suspense fallback={null}>
          <color attach="background" args={["#87CEEB"]} />
          <fog attach="fog" args={["#E6F7FF", 30, 100]} />
          <NatureLand
            treeCount={treeCount}
            searchName={searchName}
            supabaseTrees={supabaseTrees}
          />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ForestScene;
