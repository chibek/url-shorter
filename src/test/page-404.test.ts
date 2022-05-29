import { expect, test, it } from "vitest";
import Page404 from "../pages/Page404.vue";
// @ts-ignore
import { mount } from "@vue/test-utils";

test("mount component", () => {
  it("Expect be imported", () => {
    expect(Page404).toBeTruthy();
  });

  it("Expect contain text", () => {
    const wrapper = mount(Page404);
    expect(wrapper.text()).toContain("Not urls found");
  });
});
