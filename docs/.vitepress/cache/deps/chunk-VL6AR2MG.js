import {
  AbstractMermaidTokenBuilder,
  CommonValueConverter,
  EmptyFileSystem,
  MermaidGeneratedSharedModule,
  PacketGeneratedModule,
  __name,
  createDefaultCoreModule,
  createDefaultSharedCoreModule,
  inject,
  lib_exports
} from "./chunk-J32DJ2MV.js";

// node_modules/.pnpm/@mermaid-js+parser@0.6.1/node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-DI7F6ITA.mjs
var _a;
var PacketTokenBuilder = (_a = class extends AbstractMermaidTokenBuilder {
  constructor() {
    super(["packet-beta"]);
  }
}, __name(_a, "PacketTokenBuilder"), _a);
var PacketModule = {
  parser: {
    TokenBuilder: __name(() => new PacketTokenBuilder(), "TokenBuilder"),
    ValueConverter: __name(() => new CommonValueConverter(), "ValueConverter")
  }
};
function createPacketServices(context = EmptyFileSystem) {
  const shared = inject(
    createDefaultSharedCoreModule(context),
    MermaidGeneratedSharedModule
  );
  const Packet = inject(
    createDefaultCoreModule({ shared }),
    PacketGeneratedModule,
    PacketModule
  );
  shared.ServiceRegistry.register(Packet);
  return { shared, Packet };
}
__name(createPacketServices, "createPacketServices");

export {
  PacketModule,
  createPacketServices
};
//# sourceMappingURL=chunk-VL6AR2MG.js.map
