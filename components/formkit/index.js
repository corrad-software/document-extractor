import { createInput } from "@formkit/vue";
import otp from "./inputs/otp";
import dropzone from "./inputs/dropzone";
import switchInput from "./inputs/switch";
import mask from "./inputs/mask";
import combobox from "./inputs/combobox";

export default {
  otp: createInput(otp, {
    props: ["length"],
  }),
  dropzone: createInput(dropzone, {
    props: ["multiple", "accept", "maxSize", "maxFiles"],
  }),
  switch: createInput(switchInput, {
    props: ["size"],
  }),
  mask: createInput(mask, {
    props: ["mask"],
  }),
  combobox: createInput(combobox, {
    props: ["options"],
  }),
};
