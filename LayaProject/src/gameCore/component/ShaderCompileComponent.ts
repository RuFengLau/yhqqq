/**
 * Class Name : ShaderCompileComponent.ts
 * Time: 2020/4/25
 * Describe: 处理shader的预编译
 */
import {LayaScript3D} from "../components/RoleComponents/LayaScript3D";
import EventManager from "../../gameCore/managers/eventManager/EventManager";
import CustomEvents from "../models/CustomEvents";
import Shader3D = Laya.Shader3D;
import ShaderVariant = Laya.ShaderVariant;
import ResourcesManager from "../../gameCore/managers/ResourcesManager";

export class ShaderCompileComponent extends LayaScript3D {

    /**
     * 是否收集shader
     * @type {boolean}
     */
    private isCollectShader: boolean = false;

    /**
     * shader obj
     * @type {{}}
     */
    private shaderObj = {};

    /**
     * 注册事件
     */
    registerEvents() {
        super.registerEvents();
        EventManager.inst.AddEventListener(CustomEvents.EndCollectShader, this, this.onEndCollectShaders);
    }

    /**
     * begin init
     */
    beginInit() {
        super.beginInit();
        Shader3D.debugMode = this.isCollectShader;
    }

    /**
     * end init
     */
    endInit() {
        super.endInit();
        this.initShader();
    }

    /**
     * 停止收集shader
     */
    onEndCollectShaders() {
        if (false == Shader3D.debugMode) {
            return;
        }
        console.log("Shader3D.debugShaderVariantCollection.variantCount = " + Shader3D.debugShaderVariantCollection.variantCount);
        let arr;
        for (let i = 0; i < Shader3D.debugShaderVariantCollection.variantCount; i++) {
            let shadervariant: ShaderVariant = Shader3D.debugShaderVariantCollection.getByIndex(i);
            let shaderName: string = shadervariant.shader.name;
            if (!this.shaderObj[shaderName]) this.shaderObj[shaderName] = [];
            arr = this.shaderObj[shaderName];
            let obj: any = {};
            obj.defineNames = shadervariant.defineNames;
            obj.passIndex = shadervariant.passIndex;
            obj.subShaderIndex = shadervariant.subShaderIndex;
            arr.push(obj);
        }
        let json = JSON.stringify(this.shaderObj);
        console.log("shader variant 收集完成，请拷贝到 res/bin/data/shader_collection.json 文件中 = ", json);
    }

    /**
     * 收集shader
     */
    private initShader() {
        let shaderVariantContent = Laya.loader.getRes(ResourcesManager.inst.shaderVariant);
        if (!shaderVariantContent) {
            return;
        }
        this.shaderObj = JSON.parse(JSON.stringify(shaderVariantContent));
        for (let key in this.shaderObj) {
            let value = this.shaderObj[key];
            if (key && value) {
                for (let shaderVariant of value) {
                    let defineNames = shaderVariant["defineNames"];
                    let passIndex = shaderVariant["passIndex"];
                    let subIndex = shaderVariant["subShaderIndex"];
                    Shader3D.compileShaderByDefineNames(key, subIndex, passIndex, defineNames);
                }
            }
        }
        this.shaderObj = {};
    }


}