import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { csvCell } from "./MenuCsvTools";

describe("MenuCsvTools", () => {
  it("neutralizes formula-leading CSV cells", () => {
    assert.equal(
      csvCell('=IMPORTXML("https://example.com")'),
      '"\'=IMPORTXML(""https://example.com"")"',
    );
    assert.equal(csvCell("+SUM(1,2)"), '"\'+SUM(1,2)"');
    assert.equal(csvCell("plain"), "plain");
  });
});
