import { expect, test, it } from "vitest";
import EmptyPage from "../pages/EmptyPage.vue";
// @ts-ignore
import { mount } from "@vue/test-utils";

test("mount component", () => {
  it("Expect be imported", () => {
    expect(EmptyPage).toBeTruthy();
  });

  it("Expect contain text", () => {
    const wrapper = mount(EmptyPage);
    expect(wrapper.text()).toContain("Page not found 404.");
  });
});
