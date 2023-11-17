import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'http://localhost:8080',
      realm: 'tads',
      clientId: 'backend',
      secret: 'CJfeZnZrL2uLTJGRDvZHiGkTopxq5ZF1',
      tokenValidation: TokenValidation.ONLINE,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    };
  }
}
