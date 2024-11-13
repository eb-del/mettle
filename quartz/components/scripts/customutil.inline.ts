import { FullSlug, getFullSlug, pathToRoot, simplifySlug } from "../../util/path"
const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? "light"
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

  // Darkmode Toggle ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("nav", () => {
  const switchTheme = (e: Event) => {
    const newTheme =
      document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  const themeAnchor = document.querySelector("#utilDarkToggle") as HTMLAnchorElement // Corresponds to <a> html tag, not to be confused with HTMLLinkElement which is for <link>
  const otherTheme = document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark";
  themeAnchor.textContent = "Switch to " + otherTheme + " theme";
  themeAnchor.addEventListener("click", switchTheme)
  window.addCleanup(() => themeAnchor.removeEventListener("click", switchTheme))

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))

})

// "Random Page" code by t-schreibs/sound-accumulator ---------------------------------------------------------------------------------------------------------------------------------------
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

async function navigateToRandomPage() {
  const fullSlug = getFullSlug(window)
  const data = await fetchData
  const allPosts = Object.keys(data).map((slug) => simplifySlug(slug as FullSlug))
  window.location.href = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`
}

document.addEventListener("nav", async (e: unknown) => {
  const slug = (e as CustomEventMap["nav"]).detail.url
  const randomPageAnchor = document.querySelector("#utilRandom") as HTMLAnchorElement
  randomPageAnchor.addEventListener("click", navigateToRandomPage)
  window.addCleanup(() => randomPageAnchor.removeEventListener("click", navigateToRandomPage))
})
