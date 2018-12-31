import {getUserGroups, isPage401} from './helpers';

describe('Utilities helpers', ()=> {

  test('getUserGroups helper gets groups from keycloak roles', () => {
    const kcResource = {
      realm_access: {
        roles: ['uma_authorization', 'dvs_authority']
      }
    }
    expect(getUserGroups(kcResource)).toEqual(['dvs_authority']);
  })

  test('isPage401 helper detect 401 page', () => {
    const groups = ['dvs_authority'];
    expect(isPage401(groups)).toEqual(false);
  })
});