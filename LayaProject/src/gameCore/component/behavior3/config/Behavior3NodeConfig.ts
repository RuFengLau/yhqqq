import { B3Category } from "../constants";

export default interface Behavior3NodeConfig {
    id: string;
    /**
     * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or
     * `CONDITION`. This is defined automatically be inheriting the
     * correspondent class.
     * 
     * @member BaseNode#category
     **/
    category?: B3Category;

    /**
     * Node name. Must be a unique identifier,
     * preferable the same name of the
     * class. You have to set the node name in the prototype.
     * 
     * @member BaseNode#name
     **/
    name?: string;
    /**
     * Node title.
     *
     * @optional
     * @member BaseNode#title
     **/
    title?: string;
    /**
     * Node description.
     * 
     * @member BaseNode#description
     */
    description?: string;

    children?: string[];
    child?: string;
    /**
     * A dictionary (key, value) describing the node properties. Useful for
     * defining custom variables inside the visual editor.
     *
     * @property properties
     * @type {Object}
     * @readonly
     **/
    properties?: { [key: string]: string; };

    /**
     * A dictionary (key, value) describing the node parameters. Useful for
     * defining parameter values in the visual editor. Note: this is only
     * useful for nodes when loading trees from JSON files.
     *
     * **Deprecated since 0.2.0. This is too similar to the properties
     * attribute, thus, this attribute is deprecated in favor to
     * `properties`.**
     *
     * @property {Object} parameters
     * @deprecated since 0.2.0.
     * @readonly
     **/
    parameters?: { [key: string]: string; };
}

export class Behavior3NodeConfigHelper {
    static GetInt32(cfg: Behavior3NodeConfig, key: string, defaultValue: number): number {
        if (cfg.properties && (key in cfg.properties)) {
            return Number.parseInt(cfg.properties[key]);
        }
        return defaultValue;
    }

    static GetFloat(cfg: Behavior3NodeConfig, key: string, defaultValue: number): number {
        if (cfg.properties && (key in cfg.properties)) {
            return Number.parseFloat(cfg.properties[key]);
        }
        return defaultValue;
    }

    static GetString(cfg: Behavior3NodeConfig, key: string, defaultValue: string): string {
        if (cfg.properties && (key in cfg.properties)) {
            return cfg.properties[key];
        }
        return defaultValue;
    }

    static GetBool(cfg: Behavior3NodeConfig, key: string, defaultValue: boolean): boolean {
        if (cfg.properties && (key in cfg.properties)) {
            if (cfg.properties[key] === "true") {
                return true;
            }

        }
        return false;
    }
}