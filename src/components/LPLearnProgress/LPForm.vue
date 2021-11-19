<template>
  <section>
    <form>
      <div>
        <LPFormFieldWithBar
          lpLegend="Bewerte deinen allgemeinen
        Lernfortschritt"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in HTML?"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in CSS?"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in JavaScript?"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was lief deiner Meinung nach gut für dich?"
          lp__placeholder="Beschreibe was deiner Meinung nach gut für dich lief..."
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne besser machen?"
          lp__placeholder="Beschreibe was du gerne besser machen würdest..."
        />
        <LPFormFieldWithoutBar
          lpLegend="Was läuft gut im Kurs?"
          lp__placeholder="Beschreibe was du am Kurs gut findest..."
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne verbessert sehen?"
          lp__placeholder="Beschreibe was du am Kurs verbessern würdest..."
        />
      </div>
      <div>
        <cbe-main-btn buttonClass="primary">Absenden</cbe-main-btn>
      </div>
    </form>
  </section>
</template>

<script>
import LPFormFieldWithBar from "@/components/LPFormField/LPFormFieldWithBar.vue";
import LPFormFieldWithoutBar from "@/components/LPFormField/LPFormFieldWithoutBar.vue";
export default {
  name: "LPForm",
  components: {
    LPFormFieldWithBar,
    LPFormFieldWithoutBar,
  },
};
</script>

<style></style>
