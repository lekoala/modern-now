import { expect, test } from "bun:test";
import { templateAsData, dotPath, simpleConfig, supportsDialog } from "../src/utils/misc.js";

test("templateAsData", () => {
    const el = document.createElement("div");
    const t1 = document.createElement("template");
    t1.innerHTML = "true";
    el.appendChild(t1);
    document.body.appendChild(el);

    t1.dataset.test = "";
    templateAsData(el, ["test"]);
    expect(el.dataset.test).toBe("true");
    expect(el.firstElementChild).toBe(null);
});

test("dotPath", () => {
    window.app = {
        test: () => {
            return true;
        },
        someval: "test",
        obj: {
            nestedval: "test",
        },
    };
    expect(dotPath("app.test")).toBe(window.app.test);
    expect(dotPath("app.someval")).toBe("test");
    expect(dotPath("obj.nestedval", window.app)).toBe("test");
});

test("simpleConfig", () => {
    const result = {
        key: "value",
        otherkey: "othervalue",
        number: 5,
        bool: true,
    };
    function provider() {
        return {
            key: "value",
        };
    }
    window._testProvider = provider;
    expect(simpleConfig(`dateStyle:'long',timeStyle:'short'`)).toEqual({ dateStyle: "long", timeStyle: "short" });
    expect(simpleConfig("key: 'va:lue'")).toEqual({ key: "va:lue" });
    expect(simpleConfig(`"key": "va:lue"`)).toEqual({ key: "va:lue" });
    expect(simpleConfig("key: '/value'")).toEqual({ key: "/value" });
    expect(simpleConfig("key: 'value'")).toEqual({ key: "value" });
    expect(simpleConfig("key : 'value'")).toEqual({ key: "value" }); // spaces don't matter
    expect(simpleConfig("'key' : 'value'")).toEqual({ key: "value" }); // quotes for keys are optional
    expect(simpleConfig(`"key" : "value"`)).toEqual({ key: "value" }); // double quotes are ok
    expect(() => {
        simpleConfig("key : value");
    }).toThrow(); // quotes for string are mandatory to distinguish between types
    expect(simpleConfig(`key: "val'ue"`)).toEqual({ key: "val'ue" }); // values with single quotes need double quotes
    expect(simpleConfig("key: 'value', otherkey: 'othervalue', number: 5, bool: true")).toEqual(result); // parse also types
    expect(simpleConfig(`{"key": "value", "otherkey": "othervalue", "number": 5, "bool": true}`)).toEqual(result);
    expect(simpleConfig("_testProvider()")).toEqual(provider());
    expect(simpleConfig("somevalue")).toEqual({ default: "somevalue" });
    expect(simpleConfig("nested: {__fn: '_testProvider'}")).toEqual({ nested: provider });

    //Arr
    expect(simpleConfig("arr: ['my', 'value']")).toEqual({
        arr: ["my", "value"],
    });

    expect(simpleConfig("placement: 'left', target:'customtooltip'")).toEqual({
        placement: "left",
        target: "customtooltip",
    });
});

test("supportsDialog", () => {
    expect(supportsDialog() === true);
});
