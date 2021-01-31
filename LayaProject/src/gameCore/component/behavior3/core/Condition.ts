import BaseNode from './BaseNode';
import { B3Category } from '../constants';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * Condition is the base class for all condition nodes. Thus, if you want to
 * create new custom condition nodes, you need to inherit from this class.
 *
 * @class Condition
 * @extends BaseNode
 **/

export default abstract class Condition extends BaseNode {

    /**
     * Creates an instance of Condition.
     * @param {Object} options 
     * @param {Object} options.name Node name. Default to `Condition`.
     * @param {String} options.title
     * @param {Object} options.properties
     * @memberof Condition
     */
    Initialize(cfg: Behavior3NodeConfig) {
        if (cfg.name === undefined) {
            cfg.name = "Condition";
        }
        super.Initialize(cfg);
        this.category = B3Category.CONDITION;
    }

}