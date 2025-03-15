import { Range, window } from 'vscode'
import { getImportsRange, getImports } from './utils'

export const goGroupImports = async () => {
  const {
    activeTextEditor: editor,
    activeTextEditor: { document },
  } = window
  const documentText = document.getText()

  if (document.languageId !== 'go') return

  const imports = getImports(documentText)
  if (!imports.length) return

  // 按字母顺序排序
  const sortedImports = [...imports].sort((a, b) => {
    const cleanA = a.replace(/[\t"]/g, ''); // 去掉 \t 和 "
    const cleanB = b.replace(/[\t"]/g, '');
    return cleanA.localeCompare(cleanB); // 按清理后的值排序
  });
  
  
  const importsRange = getImportsRange(documentText)
  const range = new Range(
    importsRange.start,
    0,
    importsRange.end - 1,
    Number.MAX_VALUE
  )
  
  // 直接用换行符连接所有导入
  const newImports = sortedImports.join('\n')

  const edit = TextEdit.replace(range, newImports)
  return [edit]
}

import { TextEdit } from 'vscode';


type ImportGroups = {
  import: string[]
}


export const group = (
  imports: string[],
): ImportGroups => {
  // 直接按字母顺序排序
  const sortedImports = imports.sort();
  return {
    import: sortedImports,
  }
}
