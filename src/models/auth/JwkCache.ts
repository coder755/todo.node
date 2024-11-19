import jwksClient from 'jwks-rsa';
import { JWK } from 'jose';
import JWKDoesNotExistError from '../error/JWKDoesNotExistError';

const hoursToMilliSec = (hours: number) => hours * 60 * 60 * 1000;

/**
 * Cache for storing JWKs when using a thirdparty auth service like Cognito
 */
export default class JwkCache {
  private cachedKeys: JWK[] = [];

  private lastFetchedTime: number = new Date(0).getMilliseconds();

  private static cacheDuration: number = hoursToMilliSec(24);

  private client: jwksClient.JwksClient;

  constructor(authority: string) {
    this.client = jwksClient({ jwksUri: `${authority}/.well-known/jwks.json` });
  }

  public getJwk = async (kid: string): Promise<JWK> => {
    if (this.cachedKeys.length === 0 || this.isStaleKeys()) {
      const keys = await this.client.getKeys() as JWK[];
      this.cachedKeys = keys;
      this.lastFetchedTime = Date.now();
    }
    for (let i = 0; i < this.cachedKeys.length; i += 1) {
      const jwk = this.cachedKeys[i];
      if (jwk.kid === kid) {
        return jwk;
      }
    }
    throw new JWKDoesNotExistError();
  };

  private isStaleKeys = () => Date.now() - this.lastFetchedTime > JwkCache.cacheDuration;
}
