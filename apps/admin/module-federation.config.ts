import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'admin',
  exposes: {
    './Routes': 'apps/admin/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
