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
<i>Soltide</i> is a worldbuilding project made by ebdel and the <i>Soltide</i> community, published using <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>.
Any and all works used in this project contributed by either ebdel or members of the <i>Soltide</i> community are licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> license. © {year}
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
