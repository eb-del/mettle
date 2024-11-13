import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
A lore database by ebdel and the <i>Make & Mettle</i> community — <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}<br></br>
All written works and images used in this site were made by either ebdel or members of the <i>Make & Mettle</i> community and are licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> license.
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
