import {
  parse
} from "./chunk-GBAZS7GX.js";
import "./chunk-W7ALJCOY.js";
import "./chunk-U4SHSS3E.js";
import "./chunk-AMO3PAHW.js";
import "./chunk-BCANV2VP.js";
import "./chunk-L5B2FF4Q.js";
import "./chunk-VL6AR2MG.js";
import "./chunk-YBU5JDVU.js";
import "./chunk-J32DJ2MV.js";
import "./chunk-46Y37KHS.js";
import {
  package_default
} from "./chunk-G7DTYFOI.js";
import {
  selectSvgElement
} from "./chunk-TEZ7IGFB.js";
import {
  __name,
  configureSvgSize,
  log
} from "./chunk-SPAJJ3CH.js";
import "./chunk-SVROXNIC.js";
import "./chunk-5WV6JA3U.js";
import "./chunk-FDBJFBLO.js";

// node_modules/.pnpm/mermaid@11.8.1/node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-XT3IWWJI.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = {
  version: package_default.version + (true ? "" : "-tiny")
};
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-XT3IWWJI-QYBOHP3M.js.map
