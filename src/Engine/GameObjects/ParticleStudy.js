import { BufferGeometry, Color, BufferAttribute, Float32BufferAttribute, Group, Mesh, MeshNormalMaterial, Vector3 } from 'three';
import { MonoBehaviour, GameObject } from '../Core/Behaviour';

class ParticleLogic extends MonoBehaviour {
  start() {
    this.group = new Group();
    const material = new MeshNormalMaterial();
    const geometry = new BufferGeometry();
    const vertices = [
      -3.1997694969177246, -0.5878229737281799, -1.7059074640274048
    ];
    const colors = [
      1.0, 1.0, 0.5,
    ];
    const uvs = [
      Math.random(), Math.random(),
    ]
    const normals = new Float32Array( 10 * 3 * 3 );
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normals', new BufferAttribute(normals, 3));
    geometry.setAttribute('colors', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    const mesh = new Mesh(geometry, material);
    this.group.add(mesh);

    // non-indexed buffer geometry
    // var geometry = new BufferGeometry();

    // // number of triangles
    // var NUM_TRIANGLES = 10;
    // // attributes
    // var positions = new Float32Array( NUM_TRIANGLES * 3 * 3 );
    // var normals   = new Float32Array( NUM_TRIANGLES * 3 * 3 );
    // var colors    = new Float32Array( NUM_TRIANGLES * 3 * 3 );
    // var uvs       = new Float32Array( NUM_TRIANGLES * 3 * 2 );

    // var color = new Color();
    // var scale = 15;
    // var size = 5;
    // var x, y, z;

    // for ( var i = 0, l = NUM_TRIANGLES * 3; i < l; i ++ ) {

    //     if ( i % 3 === 0 ) {

    //         x = ( Math.random() - 0.5 ) * scale;
    //         y = ( Math.random() - 0.5 ) * scale;
    //         z = ( Math.random() - 0.5 ) * scale;

    //     } else {

    //         x = x + size * ( Math.random() - 0.5 );
    //         y = y + size * ( Math.random() - 0.5 );
    //         z = z + size * ( Math.random() - 0.5 );

    //     }

    //     var index = 3 * i;

    //     // positions
    //     positions[ index     ] = x;
    //     positions[ index + 1 ] = y;
    //     positions[ index + 2 ] = z;

    //     //normals -- we will set normals later

    //     // colors
    //     color.setHSL( i / l, 1.0, 0.5 );
    //     colors[ index     ] = color.r;
    //     colors[ index + 1 ] = color.g;
    //     colors[ index + 2 ] = color.b;

    //     // uvs
    //     uvs[ index     ] = Math.random(); // just something...
    //     uvs[ index + 1 ] = Math.random();

    // }
    // console.log(positions);
    // geometry.addAttribute( 'position', new BufferAttribute( positions, 3 ) );
    // geometry.addAttribute( 'normal', new BufferAttribute( normals, 3 ) );
    // geometry.addAttribute( 'color', new BufferAttribute( colors, 3 ) );
    // geometry.addAttribute( 'uv', new BufferAttribute( uvs, 2 ) );

    // // optional
    // geometry.computeBoundingBox();
    // geometry.computeBoundingSphere();

    // // set the normals
    // geometry.computeVertexNormals(); // computed vertex normals are orthogonal to the face for non-indexed BufferGeometry
    // const mesh = new Mesh(geometry, material);
    // this.group.add(mesh);
  }

  update(time) {

  }

  exportAsSceneObject() {
    return this.group;
  }
}

export class ParticleStudy extends GameObject {
  monobehaviours = {
    ParticleLogic
  }
}
