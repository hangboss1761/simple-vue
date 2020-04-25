
/**
 * 匹配 {{ x }} 语法
 */
export const mustacheReg = /\{\{(.+?)\}\}/;
export const isMustache = value => mustacheReg.test(value);

/**
 * 匹配 vue v-xx指令
 */
export const vdirectiveReg = /^v-/;
export const isVDirective = value => vdirectiveReg.test(value)

