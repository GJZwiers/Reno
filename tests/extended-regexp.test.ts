import { expect } from 'chai';
import { ExtendedRegExp } from "../src/extended-regexp/extended_regexp";

describe("ExtendedRegExp", () => {
    it("should allow access to RegExp property", () => {
        const xregex = new ExtendedRegExp(/bar/, 'foo', false);
        expect(xregex.global).to.equal(false);
    });
    it("should allow access to RegExp method", () => {
        const xregex = new ExtendedRegExp(/bar/, 'foo', false);
        expect(xregex.test('bar')).to.equal(true);
    });
    it("should map matches with no capturing groups", () => {
        const xregex = new ExtendedRegExp(/bar/, 'foo', false);
        const map = xregex.map(['bar']);
        expect(map).to.eql({full_match: 'bar'});
    });
    it("should map matches with capturing groups", () => {
        const xregex = new ExtendedRegExp(/(bar)/, '(foo)', false);
        const map = xregex.map(['bar', 'bar']);
        expect(map).to.eql({full_match: 'bar', foo: 'bar'});
    });
    it("should map matches with nested capturing groups (single tier)", () => {
        const xregex = new ExtendedRegExp(/(bar(foo))/, '(foo(bar))', false);
        const map = xregex.map(['barfoo', 'barfoo', 'foo']);
        expect(map).to.eql({full_match: 'barfoo', foo: 'barfoo', bar: 'foo'});
    
        const xregex2 = new ExtendedRegExp(/((foo)bar)/, '((bar)foo)', false);
        const map2 = xregex2.map(['foobar', 'foobar', 'foo']);
        expect(map2).to.eql({full_match: 'foobar', bar: 'foo', foo: 'foobar'});
    
        const xregex3 = new ExtendedRegExp(/((foo)bar)(baz)/, '((bar)foo)(baz)', false);
        const map3 = xregex3.map(['foobarbaz', 'foobar', 'foo', 'baz']);
        expect(map3).to.eql({full_match: 'foobarbaz', bar: 'foo', foo: 'foobar', baz: 'baz'});
    });
});