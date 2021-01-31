import BaseNode from './BaseNode';
import { B3Category } from '../constants';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * Decorator is the base class for all decorator nodes. Thus, if you want to
 * create new custom decorator nodes, you need to inherit from this class.
 *
 * When creating decorator nodes, you will need to propagate the tick signal
 * to the child node manually, just like the composite nodes. To do that,
 * override the `tick` method and call the `_execute` method on the child
 * node. For instance, take a look at how the Inverter node inherit this
 * class and how it call its children:
 *
 *     // Inherit from Decorator, using the util function Class.
 *     class Inverter extends b3.Decorator {
 *       
 *       constructor(){
 *         super({name: 'Invereter'});
 *       }
 *
 *       tick: function(tick) {
 *         if (!this.child) {
 *           return b3.ERROR;
 *         }
 *
 *         // Propagate the tick
 *         var status = this.child._execute(tick);
 *
 *         if (status === b3.SUCCESS) {
 *           status = b3.FAILURE;
 *         } else if (status === b3.FAILURE) {
 *           status = b3.SUCCESS;
 *         }
 *
 *         return status;
 *       }
 *     });
 *
 * @module b3
 * @class Decorator
 * @extends BaseNode
 **/

export default abstract class Decorator extends BaseNode {
    protected child: BaseNode;
    /**
     * Creates an instance of Decorator.
     * @param {Object} options 
     * @param {String} options.name Node name. Default to `Decorator`.
     * @param {String} options.title 
     * @param {Object} options.properties 
     * @memberof Decorator
     */
    Initialize(cfg: Behavior3NodeConfig) {
        if (cfg.name === undefined) {
            cfg.name = "Decorator";
        }
        super.Initialize(cfg);
        this.category = B3Category.DECORATOR;
    }

    set Child(val: BaseNode) {
        this.child = val;
    }
    get Child(): BaseNode {
        return this.child;
    }
}