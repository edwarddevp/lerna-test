import React, { Fragment } from 'react'
import { NoAccess } from "../NoAccess";

/**
 *
 * @param children
 * @param access: Array de accesos
 * @param moduleKey: Key de un modulo
 * @returns {*}
 */
export const renderContent = (children, access, moduleKey) => {
  if(!access.includes(moduleKey || process.env.NEXT_PUBLIC_MODULE_KEY || 'public')) {
    children = <NoAccess />
  }
  return children
}
