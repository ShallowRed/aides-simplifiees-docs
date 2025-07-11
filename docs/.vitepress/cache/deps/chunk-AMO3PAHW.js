import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  RadarGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject,
  lib_exports
} from "./chunk-J32DJ2MV.js";

// node_modules/.pnpm/@mermaid-js+parser@0.6.1/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-PYI2724P.mjs
var _a;
var RadarTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["radar-beta"]);
  }
}, __name(_a, "RadarTokenBuilder"), _a);
var RadarModule = {
  parser: {
    TokenBuilder: __name(() => new RadarTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new CommonValueConverter(), "ValueConverter")
  }
};
function createRadarServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Radar = inject(
    createDefaultCoreModule({ shared }),
    RadarGeneratedModule,
    RadarModule
  );
  shared.ServiceRegistry.register(Radar);
  return { shared, Radar };
}
__name(createRadarServices, "createRadarServices");

export {
  RadarModule,
  createRadarServices
};
//# sourceMappingURL=chunk-AMO3PAHW.js.map
