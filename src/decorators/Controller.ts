import "reflect-metadata";

export function Controller( router: string ) {
    return function (target: Function) {
        Reflect.defineMetadata("router", router, target);
    }
}