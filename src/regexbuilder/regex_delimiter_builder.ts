import { RegexBuilderBase } from "./regex_builder_base";

export class RegexDelimiterBuilder extends RegexBuilderBase {
    /** Adds a part in between delimiters, meaning the character you pass will be the characters enclosing the match, with no character of the same type within.  
     * Examples:
     * 
     *       .within('"') >> /"[^\"]"/
     */
    within(char: string): this {
        this.regex.parts.push(char, `[^${char}]*`, char);
        return this;
    }
}