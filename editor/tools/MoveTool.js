function MoveTool()
{
	//Super
	THREE.Object3D.call(this);

	//Move components
	this.x = new THREE.Scene();
	this.y = new THREE.Scene();
	this.z = new THREE.Scene();

	var pid2 = Math.PI / 2;

	//Materials
	this.material_red = new THREE.MeshBasicMaterial({color: 0xff0000});
	this.material_green = new THREE.MeshBasicMaterial({color: 0x00ff00});
	this.material_blue = new THREE.MeshBasicMaterial({color: 0x0000ff});
	this.material_yellow = new THREE.MeshBasicMaterial({color: 0xffff00});
	var material_invisible = new THREE.MeshBasicMaterial();
	material_invisible.opacity = 0;
	material_invisible.transparent = true;
	material_invisible.needsUpdate = true;

	//Geometries
	var cylinder_geometry = new THREE.CylinderBufferGeometry(0.01, 0.01, 1, 5);
	var cylinder_geometry_big = new THREE.CylinderBufferGeometry(0.1, 0.1, 1, 5);
	var cone_geomtry = new THREE.ConeBufferGeometry(0.05, 0.15, 8);

	//X
	var mesh = new THREE.Mesh(cylinder_geometry, this.material_red);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.x.add(mesh);
	mesh = new THREE.Mesh(cone_geomtry, this.material_red);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 1, 0);
	mesh.updateMatrix();
	this.x.add(mesh);
	mesh = new THREE.Mesh(cylinder_geometry_big, material_invisible);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.x.add(mesh);
	this.x.rotateOnAxis(new THREE.Vector3(0,0,1) , -pid2);
	this.x.updateMatrix();
	this.x.matrixAutoUpdate = false;

	//Y
	mesh = new THREE.Mesh(cylinder_geometry, this.material_green);
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.y.add(mesh);
	mesh = new THREE.Mesh(cone_geomtry, this.material_green);
	mesh.position.set(0, 1, 0);
	mesh.updateMatrix();
	this.y.add(mesh);
	mesh = new THREE.Mesh(cylinder_geometry_big, material_invisible);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.y.add(mesh);
	this.y.matrixAutoUpdate = false;

	//Z
	mesh = new THREE.Mesh(cylinder_geometry, this.material_blue);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.z.add(mesh);
	mesh = new THREE.Mesh(cone_geomtry, this.material_blue);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 1, 0);
	mesh.updateMatrix();
	this.z.add(mesh);
	mesh = new THREE.Mesh(cylinder_geometry_big, material_invisible);
	mesh.matrixAutoUpdate = false;
	mesh.position.set(0, 0.5, 0);
	mesh.updateMatrix();
	this.z.add(mesh);
	this.z.rotateOnAxis(new THREE.Vector3(1,0,0), pid2);
	this.z.updateMatrix();
	this.z.matrixAutoUpdate = false;

	//Center Block
	this.block = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), this.material_yellow);
	this.block.matrixAutoUpdate = false;

	//Add
	this.add(this.x);
	this.add(this.y);
	this.add(this.z);
	this.add(this.block);
}

//Functions Prototype
MoveTool.prototype = Object.create(THREE.Object3D.prototype);
MoveTool.prototype.highlightSelectedComponents = highlightSelectedComponents;

//Highligth selected compoonents and return witch are selected
function highlightSelectedComponents(raycaster)
{
	var selected = false;
	var x = false, y = false, z = false;

	//X Component
	if(raycaster.intersectObject(this.x, true).length > 0)
	{
		selected = true;
		x = true;
		this.x.children[0].material = this.material_yellow;
		this.x.children[1].material = this.material_yellow;
	}
	else
	{
		this.x.children[0].material = this.material_red;
		this.x.children[1].material = this.material_red;
	}

	//Y Component
	if(raycaster.intersectObject(this.y, true).length > 0)
	{
		selected = true;
		y = true;
		this.y.children[0].material = this.material_yellow;
		this.y.children[1].material = this.material_yellow;
	}
	else
	{
		this.y.children[0].material = this.material_green;
		this.y.children[1].material = this.material_green;
	}

	//Z Component
	if(raycaster.intersectObject(this.z, true).length > 0)
	{
		selected = true;
		z = true;
		this.z.children[0].material = this.material_yellow;
		this.z.children[1].material = this.material_yellow;
	}
	else
	{
		this.z.children[0].material = this.material_blue;
		this.z.children[1].material = this.material_blue;
	}

	return {selected, x, y, z};
}