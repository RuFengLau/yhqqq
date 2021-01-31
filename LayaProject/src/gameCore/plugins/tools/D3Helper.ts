
import Vector3Helper from './Vector3Helper';

/**
 * 3D工具类
 */
export default class D3Helper {
    /**
     * 世界坐标转局部坐标
     * @param {Laya.Vector3} pos2world 世界坐标
     * @param {Laya.Sprite3D} sp3d 局部空间
     * @returns {Laya.Vector3} 局部坐标
     */
    public static positionWorld2local(pos2world: Laya.Vector3, sp3d: Laya.Sprite3D):Laya.Vector3 {
        let pos2local: Laya.Vector3 = new Laya.Vector3(0, 0, 0);//局部坐标
        let m: Laya.Matrix4x4 = new Laya.Matrix4x4();//新建空矩阵	
        sp3d.transform.worldMatrix.invert(m);//获取当前局部空间的逆矩阵
        Laya.Vector3.transformCoordinate(pos2world, m, pos2local);
        return pos2local;
    }

    /**
     * 粒子shader预编译
     * 2.4废弃
     * @param model 
     */
    public static CompileParticalShader(model: any): void {
        //如果是粒子特效
        if (model instanceof Laya.ShuriKenParticle3D) {
            var shuriKenParticle3D: Laya.ShuriKenParticle3D = model as Laya.ShuriKenParticle3D;
            var render: Laya.ShurikenParticleRenderer = shuriKenParticle3D.particleRenderer;
            var materials: Array<any> = render.materials;
            var spriteDefine = render.sharedMaterial._defineDatas;
            for (var i: number = 0; i < materials.length; i++) {
                var mater: Laya.ShurikenParticleMaterial = materials[i] as Laya.ShurikenParticleMaterial;
                console.log(mater["_shader"]._name, 0, 0, spriteDefine, mater._defineDatas["_mask"]);
                Laya.Shader3D.compileShader(mater["_shader"]._name, 0, 0, spriteDefine, mater._defineDatas["_mask"]);
            }
        }
        //递归获取子对象
        if (model._children) {
            for (var i: number = 0; i < model._children.length; i++) {
                this.CompileParticalShader(model._children[i]);
            }
        }
    }
    /**
     * 移除子物体
     * @param root 
     */
    public static destoryChilds(root: Laya.Sprite3D): void {
        if (!root || root.numChildren == 0)
            return;

        var len: number = root.numChildren - 1;
        for (; len >= 0; len--) {
            if (root.numChildren > len) {
                var child: Laya.Node = root.getChildAt(len);
                child.destroy(true);
            }
        }

        if (root.numChildren > 0)
            this.destoryChilds(root);
    }

    /**
     * 设置所有子物体是否激活
     * @param root 
     * @param activie 
     */
    public static activeChild(root: Laya.Sprite3D, activie: boolean): void {
        if (!root || root.numChildren == 0)
            return;

        var len: number = root.numChildren - 1;
        for (; len >= 0; len--) {
            if (root.numChildren > len) {
                var child: Laya.Sprite3D = root.getChildAt(len) as Laya.Sprite3D;
                child.active = activie;
                this.activeChild(child, activie);
            }
        }
    }

    /**
     * 停止播放特效
     * @param eft 
     */
    public static stopEffect(eft: Laya.Sprite3D): void {
        var n: number = eft.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: Laya.ShuriKenParticle3D = eft.getChildAt(i) as Laya.ShuriKenParticle3D;
            if (child instanceof Laya.ShuriKenParticle3D) {
                child.particleSystem.stop();
            }

            this.stopEffect(child);
        }
    }

    /**
     * 播放特效
     * @param eft 
     */
    public static playEffect(eft: Laya.Sprite3D): void {
        var n: number = eft.numChildren;
        if (eft instanceof Laya.ShuriKenParticle3D) {
            eft.particleSystem.play();
        }
        for (var i: number = 0; i < n; i++) {
            var child: Laya.ShuriKenParticle3D = eft.getChildAt(i) as Laya.ShuriKenParticle3D;
            if (child instanceof Laya.ShuriKenParticle3D) {
                child.particleSystem.play();
            }

            this.playEffect(child);
        }
    }

    /**
     * 效开启
     * @param root 
     */
    public static enableFog(root: Laya.Sprite3D): void {
        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: Laya.MeshSprite3D = root.getChildAt(i) as Laya.MeshSprite3D;
            if (child instanceof Laya.MeshSprite3D) {
                var material: Laya.BlinnPhongMaterial = child.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                if (material instanceof Laya.BlinnPhongMaterial) {
                    //material.
                }
            }
            this.playEffect(child);
        }
    }

    
    /**
     * 发射阴影
     * @param root 
     * @param castShadow 
     */
    public static castShadow(root: Laya.Sprite3D, castShadow: boolean): void {
        if (root instanceof Laya.MeshSprite3D) {
            root.meshRenderer.castShadow = castShadow;
        }
        else if (root instanceof Laya.SkinnedMeshSprite3D) {
            (root as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.castShadow = castShadow;
        }

        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: Laya.Sprite3D = root.getChildAt(i) as Laya.Sprite3D;
            this.castShadow(child as Laya.Sprite3D, castShadow);
        }
    }

    /**
     * 接受
     * @param root 
     * @param flag 
     */
    public static accpetShadow(root: Laya.Sprite3D, flag: boolean): void {
        if (root instanceof Laya.MeshSprite3D) {
            root.meshRenderer.receiveShadow = flag;
        }
        else if (root instanceof Laya.SkinnedMeshSprite3D) {
            (root as Laya.SkinnedMeshSprite3D).skinnedMeshRenderer.receiveShadow = flag;
        }

        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: Laya.Sprite3D = root.getChildAt(i) as Laya.Sprite3D;
            this.accpetShadow(child as Laya.Sprite3D, flag);
        }
    }

    public static specularColor(root: Laya.Sprite3D, color: Laya.Vector4): void {
        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: any = root.getChildAt(i);
            if (child instanceof Laya.MeshSprite3D) {
                var material: Laya.BlinnPhongMaterial = child.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                if (!material) {
                    child.meshRenderer.sharedMaterial = new Laya.BlinnPhongMaterial();
                    material = child.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                }
                material.specularColor = color;
            }
            else if (child instanceof Laya.SkinnedMeshSprite3D) {
                let sp = child as Laya.SkinnedMeshSprite3D;
                var material: Laya.BlinnPhongMaterial = sp.skinnedMeshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                if (!material) {
                    sp.skinnedMeshRenderer.sharedMaterial = new Laya.BlinnPhongMaterial();
                    material = sp.skinnedMeshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                }
                material.specularColor = color;
            }

            this.specularColor(child as Laya.Sprite3D, color);
        }
    }

    public static albedoColor(root: Laya.Sprite3D, color: Laya.Vector4, useShare: boolean = true, useTransparent: boolean = false): void {
        if (root instanceof Laya.MeshSprite3D) {
            var material: Laya.BlinnPhongMaterial;
            if (useShare) {
                material = root.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                if (useTransparent) {
                    material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
                } else {
                    material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
                }
                if (!material) {
                    root.meshRenderer.sharedMaterial = new Laya.BlinnPhongMaterial();
                    material = root.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
                }
            } else {
                material = root.meshRenderer.material as Laya.BlinnPhongMaterial;
                if (useTransparent) {
                    material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
                } else {
                    material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_OPAQUE;
                }

                if (!material) {
                    root.meshRenderer.material = new Laya.BlinnPhongMaterial();
                    material = root.meshRenderer.material as Laya.BlinnPhongMaterial;
                }
            }

            material.albedoColor = color;
        }

        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: Laya.MeshSprite3D = root.getChildAt(i) as Laya.MeshSprite3D;
            this.albedoColor(child as Laya.Sprite3D, color);
        }
    }


    /**
     * 设置显示的材质
     * @param root 
     * @param material 
     */
    public static setMaterial(root: Laya.Sprite3D, material: any): void {
        var n: number = root.numChildren;
        for (var i: number = 0; i < n; i++) {
            var child: any = root.getChildAt(i) as Laya.MeshSprite3D;
            if (child instanceof Laya.MeshSprite3D) {
                (child as Laya.MeshSprite3D).meshRenderer.sharedMaterial = material;
            }
            else if (child instanceof Laya.SkinnedMeshSprite3D) {
                let sp = child as Laya.SkinnedMeshSprite3D;
                sp.skinnedMeshRenderer.sharedMaterial = material;
            }
            this.setMaterial(child as Laya.Sprite3D, material);
        }
    }


    /**
     * 创建一个box
     * @param xSize 
     * @param ySize 
     * @param zSize 
     */
    public static createBoxMesh(xSize: number, ySize: number, zSize: number): Laya.MeshSprite3D {
        var result: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(xSize, ySize, zSize))
        return result;
    }


    public static scaleChild(root: Laya.Sprite3D, scale: Laya.Vector3): void {
        var len: number = root.numChildren;
        for (var i: number = 0; i < len; i++) {
            var child = root.getChildAt(i) as Laya.Sprite3D;
            var pos = child.transform.localPosition;
            Laya.Vector3.multiply(pos, scale, pos);
            child.transform.localPosition = pos;
            var childScale = child.transform.localScale;
            Laya.Vector3.multiply(childScale, scale, childScale);
            child.transform.localScale = childScale;
        }
    }

    /**
     * 面朝目标点
     * @param display 
     * @param angleDleta 
     * @param targetPos 
     */
    public static faceTo(display: Laya.Sprite3D, angleDleta: number, targetPos: Laya.Vector3): number {
        let roation = display.transform.localRotationEuler;
        let position = display.transform.position;
        let t = Vector3Helper.v3Temp1;
        Laya.Vector3.subtract(targetPos, position, t);
        let angleY: number = Math.atan2(t.x, t.z) * 180 / Math.PI;
        let targetY: number = angleY;
        if (angleY < 0) {
            angleY = 360 + angleY;
        }

        if (angleY < roation.y) {
            if (roation.y - angleY <= 180) {
                t.y = roation.y - angleDleta;
                angleY = t.y < angleY ? angleY : t.y;
            }
            else {
                t.y = (roation.y + angleDleta) % 360;
                angleY = t.y > angleY ? angleY : t.y;

            }
        }
        else if (angleY > roation.y) {
            if (angleY - roation.y <= 180) {
                t.y = (roation.y + angleDleta) % 360;
                angleY = t.y > angleY ? angleY : t.y;
            }
            else {
                t.y = roation.y - angleDleta;
                angleY = t.y < angleY ? angleY : t.y;
            }
        }

        t.setValue(0, angleY, 0)
        display.transform.localRotationEuler = t;

        return targetY;
    }

    public static setMeshTexture(mesh: Laya.Sprite3D, tex: Laya.Texture2D): void {
        if (mesh instanceof Laya.MeshSprite3D) {
            let ms = mesh as Laya.MeshSprite3D;
            let material = ms.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
            if (!material) {
                material = new Laya.BlinnPhongMaterial();
                ms.meshRenderer.sharedMaterial = material;
            }
            material.albedoTexture = tex;
        }
        else if (mesh instanceof Laya.SkinnedMeshSprite3D) {
            let sm = mesh as Laya.SkinnedMeshSprite3D;
            let material = sm.skinnedMeshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
            if (!material) {
                material = new Laya.BlinnPhongMaterial();
                sm.skinnedMeshRenderer.sharedMaterial = material;
            }
            material.albedoTexture = tex;
        }

        let len = mesh.numChildren;
        for (var i: number = 0; i < len; i++) {
            this.setMeshTexture(mesh.getChildAt(i) as Laya.Sprite3D, tex);
        }
    }

    public static findChild(sp: any, name: string) {
        if (sp.name == name)
            return sp;
        else
            return this._findChild(sp._children, name);
    }

    private static _findChild(spArr, name) {
        var arr = [];
        for (var i = 0; i < spArr.length; i++) {
            var child = spArr[i];
            if (child.name == name) {
                return child;
            }
            else if (child.numChildren) {
                arr = arr.concat(child._children);
            }
        }
        if (!arr.length)
            return null;
        return this._findChild(arr, name);
    }
}