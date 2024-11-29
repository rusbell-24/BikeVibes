import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

type UserType = 'URBAN' | 'EXPLORA' | 'MASTER';

@Injectable({ providedIn: 'root' })
export class PermissionsForFeaturesService {
  private userType: UserType | null = null;

  setUserType(userType: UserType): void {
    this.userType = userType;
  }

  canAccessFeature(feature: string): boolean {
    if (!this.userType) return false;

    const permissions: Record<UserType, string[]> = {
      URBAN: [''],
      EXPLORA: ['eventPortalFeature', 'deleteRouteFeature'],
      MASTER: ['sharedRouteFeature','eventPortalFeature', 'deleteEventFeature', 'customizationProfileFeature','deleteRouteFeature'],
    };

    return permissions[this.userType].includes(feature);
  }
}