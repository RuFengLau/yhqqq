import Behavior3NodeConfig from "./Behavior3NodeConfig";

export default interface Behavior3TreeConfig {
    id: string;
    root: string;
    title: string;
    description: string;
    properties: { [key: string]: string; };
    nodes: { [key: string]: Behavior3NodeConfig };
}