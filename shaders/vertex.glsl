// vertex is responsible for position of the shape
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}