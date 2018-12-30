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

  it('should detect the dictionary link for "jkl" in "abc def ghi jkl (-> dict1)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def ghi jkl (-> dict1)"),
      'abc def ghi <span class="dictionary-linked" data-dictionary-id="dict1">jkl</span>');
  });

  it('should detect the dictionary link for "ghi jkl" in "abc def ghi_jkl (-> dict1)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def ghi_jkl (-> dict1)"),
      'abc def <span class="dictionary-linked" data-dictionary-id="dict1">ghi jkl</span>');
  });

  it('should detect the dictionary link for "def ghi jkl" in "abc (def ghi jkl) (-> dict1)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc (def ghi jkl) (-> dict1)"),
      'abc <span class="dictionary-linked" data-dictionary-id="dict1">def ghi jkl</span>');
  });

  it('should detect the dictionary link for "jkl" and the headword "hji klm"\
in "abc def ghi jkl (->dict1: hji klm)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def ghi jkl (->dict1: hji klm)"),
      'abc def ghi <span class="dictionary-linked" data-dictionary-id="dict1" \
data-dictionary-headword="hji klm">jkl</span>');
  });

  it('should detect the dictionary link for "jkl", the headword "hji" and the part of speech "noun"\
in "abc def ghi jkl (->dict1: hji, noun)"', () => {
    const parser = new Parser();
    assert.equal(parser.parse("abc def ghi jkl (->dict1: hji, noun)"),
      'abc def ghi <span class="dictionary-linked" data-dictionary-id="dict1" \
data-dictionary-headword="hji" data-dictionary-pos="noun">jkl</span>');
  });
});
