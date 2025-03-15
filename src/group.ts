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
  const sortedImports = imports.sort()
  
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
