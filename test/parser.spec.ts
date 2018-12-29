import * as assert from "assert";
import "mocha";
import Parser from "../src/scripts/parser";

describe("Markup parser", () => {
  it('should detect the explanation text "jkl" in "abc def ghi jkl (= explanation text)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def ghi jkl (= explanation text)"),
      'abc def ghi <span class="annotated">jkl <span class="annotation">explanation text</span></span>');
  });
  it('should detect the explanation text for "def ghi jkl" and replace underscores with whitespaces in \
      "abc def_ghi_jkl (= explanation text)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def_ghi_jkl (= explanation text)"),
      'abc <span class="annotated">def ghi jkl <span class="annotation">explanation text</span></span>');
  });
  it('should detect the explanation text for "ghi jkl" in "abc def (ghi jkl) (= explanation text)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def (ghi jkl) (= explanation text)"),
      'abc def <span class="annotated">ghi jkl <span class="annotation">explanation text</span></span>');
  });
});
