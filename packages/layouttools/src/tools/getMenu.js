/**
 *
 * @param access: Array de accesos
 * @param onlyPageRoutes
 * @param pageRoutes
 * @param options
 * @param moduleKey: Key de un modulo
 * @returns {[]}
 */
export const getMenu = (access, onlyPageRoutes, pageRoutes, menu, moduleKey) => {
  let _menu = [] // aca se puede cambiar por menu default
  if(access.includes(moduleKey || process.env.NEXT_PUBLIC_MODULE_KEY || 'public')) {
    _menu = onlyPageRoutes && pageRoutes.length ? pageRoutes : menu.concat(pageRoutes)
  }
  return _menu
}
