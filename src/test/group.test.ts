import * as assert from 'assert';
import { group } from '../group';

suite('Group Test', () => {


  test('应该按字母顺序对导入进行排序', () => {
    const imports = [
      '"github.com/pkg/errors"',
      '"fmt"',
      '"database/sql"',
      '"github.com/gin-gonic/gin"',
      '"context"',
      '"github.com/aws/aws-sdk-go"',
    ];

    const expected = [
      '"context"',
      '"database/sql"',
      '"fmt"',
      '"github.com/aws/aws-sdk-go"',
      '"github.com/gin-gonic/gin"',
      '"github.com/pkg/errors"',
    ];

    const sorted = group(imports);
    assert.deepStrictEqual(sorted, expected);
  });

});
