// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import customUtilScript from "./scripts/customutil.inline"
import styles from "./styles/customutil.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const CustomUtil: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <div class ="custom-utility">
      <ul class="no-bullets">
        <li>
          <a href = "" class = {classNames(displayClass, "utilRandom")} id = "utilRandom">
            Random article
          </a>
        </li>
        <li>
          <a href = "" class = {classNames(displayClass, "utilDarkToggle")} id = "utilDarkToggle">
            Switch to dark theme
          </a>
        </li>
      </ul>
    </div>
  )
}

CustomUtil.beforeDOMLoaded = customUtilScript
CustomUtil.css = styles

export default (() => CustomUtil) satisfies QuartzComponentConstructor
