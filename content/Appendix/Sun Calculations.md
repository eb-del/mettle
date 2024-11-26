---
title: "Sun Calculations"
draft: false
tags:
  - 
---

[[Seath]] is known for having a variable axial tilt (obliquity). This impacts the length of a day over the year, as well as how much solar energy a latitude receives.

![[insolation.png]]

# Orbital Description
Described by text, the orbital pattern over a year (comprised of 1000 days) is described as follows: 

- The planet has a circular orbit
- On the first day of the year, the world has an axial tilt of 0°. 
- On the 250th day of the year (the end of the equinox), the planet begins to tilt in a direction tangential to the orbital path. Simultaneously the planet begins to precess; precessional velocity increases linearly. 
- On the 500th day of the year (the solstice), the planet is at its maximum tilt of 45°, with the north pole towards the sun, having precessed a half rotation since the end of the equinox; after this point, precessional velocity reduces linearly. 
- On the 750th day of the year (the beginning of the new equinox), the planet's axial tilt will have reduced to zero, and it will have precessed another half rotation, a complete rotation of the planetary axis since the end of the previous equinox.
- The year begins anew on the 1001st (first) day.
- The change in precessional velocity does not alter the length of a solar day.

# Apparent Axial Tilt
Our goal is to calculate how precession impacts the apparent effects of axial tilt (also called solar declination in this context). 

When the planet is tilted towards or away from the sun, the apparent axial tilt is maximized (equal to the true axial tilt). When the planet is tilted in a direction perpendicular to the direction of the sun (as in neither towards nor away from the sun), the apparent axial tilt is minimized (equal to zero, as if the planet isn't tilted at all).

The absolute precessional displacement in degrees, $\theta_\text{P}$ is given by:
$$
\theta_\text{P} \equiv \begin{cases} 0, & 0\leq\text{day}<250 \\
k(\text{day} - 250)^2, & 250\leq\text{day}<500 \\ 
-k(\text{day} - 750)^2 + 360, & 500\leq\text{day}<750 \\ 
360, & 750\leq\text{day}<1000\end{cases}
$$
$$
\text{where } k= 0.00288
$$
which can be rewritten as

$$
\theta_\text{P} = \begin{cases} k\left(\dfrac{|\text{day} - 250| + (\text{day} - 250)}{2}\right)^2, & 0\leq\text{day}<500 \\ 
-k\left(\dfrac{|\text{day} - 750| - (\text{day} - 750)}{2}\right)^2 + 360, & 500\leq\text{day}<1000 \\ \end{cases}
$$
$$
\text{where } k= 0.00288
$$

This quantity isn't very useful to an observer on the surface of the planet, as it's a from a top-down frame of reference overlooking the entire system. It does not take into consideration the planet's position during its revolution around the sun.

The absolute solar angle in degrees is $\theta_\text{S}$, where an angle of 0° describes the orientation of the sun relative to the world on the first day of the year, as viewed from the earlier top-down frame of reference. On the 500th day of the year,  $\theta_\text{S} = \theta_\text{P} = 180°$. $\theta_\text{S}$ is given by:

$$
\theta_\text{S} \equiv \dfrac{360}{1000}\text{day}
$$

The solar displacement angle in degrees, $\theta_\text{D}$, is the magnitude of the angular displacement between  $\theta_\text{P}$ and $\theta_\text{S}$. $\theta_\text{D}$ is given by:

$$
\theta_\text{D} = |\theta_\text{S}-\theta_\text{P}|
$$

which can be expanded as

$$
\theta_\text{D} = \begin{cases} \left|\dfrac{360}{1000}\text{day} - k\left(\dfrac{|\text{day} - 250| + (\text{day} - 250)}{2}\right)^2\right|, & 1\leq\text{day}<500 \\ \left|\dfrac{360}{1000}\text{day} + k\left(\dfrac{|\text{day} - 750| - (\text{day} - 750)}{2}\right)^2 + 360\right|, & 500\leq\text{day}<1000 \\ \end{cases}
$$
$$
\text{where } k = 0.00288
$$

We can use $\theta_\text{D}$ to produce a normalized scale. That way, we can multiply with the absolute axial tilt to give an apparent axial tilt (solar declination, our original goal), but we need to make a few adjustments first.

First we recognize that when $\theta_\text{D} = 90º$ (the planet is tilted in a direction perpendicular to the direction of the sun), the apparent axial tilt is minimized, at 0º. When $\theta_\text{D} < 90º$, the apparent axial tilt is approaching its true axial tilt. When $\theta_\text{D} = 0º$, apparent axial tilt is maximized, equal to the true axial tilt. Interestingly, when $\theta_\text{D} > 90º$, this means that the apparent axial tilt has tipped in the opposite direction of the true axial tilt (a negative solar declination; the north pole is pointing away from the sun, which occurs a negligible amount, twice per year),

We are now going to normalize $\theta_\text{D}$ (called $\theta_\text{D}^{\prime}$, where we force the values to be on a range from 0 to 1), but we have to define what our values mean again in this new context. After normalization, a value of 0 means that apparent axial tilt is minimized and equal to 0º, a value of 1 means the apparent axial tilt is equal to the true axial tilt. a value less than 0 means that the apparent axial tilt is in the opposite direction of the true axial tilt. 

To recap simply: 
$$
\begin{aligned} \theta_\text{D}^{\prime} = 0 : \theta_\text{D} = 90º \\ \\
\theta_\text{D}^{\prime} = 1 : \theta_\text{D} = 0º \end{aligned}
$$

The first adjustment we make is flipping and sliding $\theta_\text{D}$ along the y axis to produce  $\theta_\text{DI}$. This adjustment is necessary to produce the range we want, while un-inverting the correlation.

$$
\theta_\text{DI} \equiv -\theta_\text{D} +90
$$

Now we can normalize by min-max feature scaling. Recall that our bounds are 0º and 90º.

$$
\begin{aligned} \theta_\text{D}^{\prime} \equiv \dfrac{\theta_\text{DI} - \theta_{\text{DI}_\text{min}}}{\theta_{\text{DI}_\text{max}}-\theta_{\text{DI}_\text{min}}} = \dfrac{-\theta_\text{D} +90}{90} = \dfrac{-\theta_\text{D}}{90}+1 \end{aligned} 
$$

We then substitute in earlier equations:

$$
\theta_\text{D}^{\prime} = \begin{cases} \dfrac{-\left|\dfrac{360}{1000}\text{day} - k\left(\dfrac{|\text{day} - 250| + (\text{day} - 250)}{2}\right)^2\right|}{90} + 1, & 1\leq\text{day}<500 \\ 
\dfrac{-\left|\dfrac{360}{1000}\text{day} + k\left(\dfrac{|\text{day} - 750| - (\text{day} - 750)}{2}\right)^2 - 360\right|}{90} + 1, & 500\leq\text{day}<1000 \\ \end{cases}
$$
Yikes. This equation covers information across the whole year, yet the relevant range is only between the end of the old equinox (250th day) and the beginning of the new equinox (750th day). We can backtrack and use an earlier form of $\theta_\text{P}$ with the ranges we care about, producing:

$$
\theta_\text{D} = \begin{cases} \left|\dfrac{360}{1000}\text{day} - k\left(\text{day} - 250\right)^2\right|, & 250\leq\text{day}<500 \\ \left|\dfrac{360}{1000}\text{day} + k\left(\text{day} - 750\right)^2 - 360\right|, & 500\leq\text{day}<750 \\ \end{cases}
$$
$$
\text{where } k= 0.00288
$$

And then substitute into the equation for $\theta_\text{D}^{\prime}$:

$$
\theta_\text{D}^{\prime} = \begin{cases} \dfrac{-\left|\dfrac{360}{1000}\text{day} - k\left(\text{day} - 250\right)^2\right|}{90} + 1, & 250\leq\text{day}<500 \\ 
\dfrac{-\left|\dfrac{360}{1000}\text{day} + k\left(\text{day} - 750\right)^2 - 360\right|}{90} + 1, & 500\leq\text{day}<750 \\ \end{cases}
$$
$$
\text{where } k= 0.00288
$$

We have our normalized solar displacement factor $\theta_\text{D}^{\prime}$. Now all we have to do is multiply it by the equation for the true axial tilt in degrees, $\varepsilon_\text{T}$, to produce the apparent axial tilt in degrees, $\varepsilon_\text{A}$.

$$
\varepsilon_\text{A} \equiv \theta_\text{D}^{\prime}\cdot \varepsilon_\text{T}
$$

The true axial tilt can be expressed as the derivative of the logistic function (because why not).

$$
\varepsilon_\text{T} \equiv 120 \dfrac{e^{K\left(\text{day} - 500\right)}}{\left(1+e^{K\left(\text{day} - 500\right)}\right)^2}
$$
$$
\text{where } K = 0.03
$$

We can then substitute to produce our final equation for apparent axial tilt (solar declination).

$$
\varepsilon_\text{A} = \begin{cases} 120 \dfrac{e^{K\left(\text{day} - 500\right)}}{\left(1+e^{K\left(\text{day} - 500\right)}\right)^2} \cdot \left( \dfrac{-\left|\dfrac{360}{1000}\text{day} - k\left(\text{day} - 250\right)^2\right|}{90} + 1 \right), & 250\leq\text{day}<500 
\\ 
120 \dfrac{e^{K\left(\text{day} - 500\right)}}{\left(1+e^{K\left(\text{day} - 500\right)}\right)^2} \cdot \left(\dfrac{-\left|\dfrac{360}{1000}\text{day} + k\left(\text{day} - 750\right)^2 - 360\right|}{90} + 1 \right), & 500\leq\text{day}<750 \\ \end{cases}
$$
$$
\text{where } K = 0.03 \text{ and } k= 0.00288
$$

# Approximate Fraction Daylight Hours

Now that we have the apparent axial tilt, we can calculate the more useful quantity, the fraction of a day spent in daylight, by latitude and apparent axial tilt. Note that this is an approximation, as we are ignoring a few factors that impact daylight hours, such as solar refraction, and the apparent size of the sun in the sky.

The sunrise equation (or sunset equation) gives us useful information (while skipping the two factors mentioned earlier; we can calculate those later):

$$
\cos(\omega) = -\tan(\phi) \cdot \tan(\theta)
$$

Where $\omega$ represents the solar hour angle at sunrise (for the positive result) and the sunset (for the negative result); $\phi$ represents the latitude of the observer in radians; and $\theta$ represents the angular declination of that day in radians (we like dealing in degrees, however, so adjustments need to be made).

Because the right side of the equation is on the bounds $[-\infty,\infty]$, but the function $acos(x)$ only accepts values on the bounds $[-1,1]$, we need to re-express the above equation as:

$$
\omega = \arccos\left(\max\left(\min\left(-\tan\left(\phi\dfrac{\pi}{180}\right) \cdot \tan\left(\theta\dfrac{\pi}{180}\right),1\right),-1\right)\right)\cdot\dfrac{180}{\pi}
$$

This conversion produces values from 0º to 180º, where 0º represents polar night (days without daylight) and 180º represents polar day (days without night). We can normalize with an easy min-max feature scaling to produce a fraction (as a decimal).

$$
\omega^{\prime} \equiv \dfrac{\omega - \omega_\text{min}}{\omega_\text{max}-\omega_\text{min}}
= \dfrac{\omega}{180}
$$
which can simply be expanded as:

$$
\omega^{\prime} = \arccos\left(\max\left(\min\left(-\tan\left(\phi\dfrac{\pi}{180}\right) \cdot \tan\left(\theta\dfrac{\pi}{180}\right),1\right),-1\right)\right)\cdot\dfrac{1}{\pi}
$$

# Insolation
True solar insolation is more complicated as it more directly impacted by atmospheric conditions, however we can get some interesting insights from our strange orbital dynamics if we just calculate the amount of solar energy reaching the top of the atmosphere.

The average solar insolation $\bar{Q}$ over a day is given by the following formula:

$$
\bar{Q} = \dfrac{S_0}{\pi}\dfrac{{R_0}^2}{{R_E}^2}\left(\omega\sin(\phi)\sin(\theta)+\cos(\phi)\cos(\theta)\sin(\omega)\right)
$$
Similar to previous calculations, $\omega$ represents the solar hour angle at sunrise; $\phi$ represents the latitude of the observer in radians; and $\theta$ represents the solar declination of that day in radians (Also again we like dealing in degrees, however, so adjustments need to be made).

The variables in the coefficient, $S_0$ (the solar constant), ${R_0}$ (current distance from the planet and the sun), and ${R_E}$ (mean distance from the planet and the sun), can be removed in the context of average relative solar insolation, $\bar{Q}_R$. The solar constant is the amount of energy received by a given area (irrelevant when dealing with values relative to the equatorial insolation), and for circular orbits (as with our system), ${R_0} = {R_E}$, therefor the ratio of their squares is 1. 

The relative form of the above equation also requires that we divide by the equinox equatorial condition ($\omega = 90º,\phi = 0º,\theta = 0º$; in a wider context, this scenario represents the highest "normal" average daily solar insolation $\bar{Q}$). The equation above becomes:

$$
\bar{Q}_R = \dfrac{\dfrac{1}{\pi}\left(\omega\dfrac{\pi}{180}\sin(\phi\dfrac{\pi}{180})\sin(\theta\dfrac{\pi}{180})+\cos(\phi\dfrac{\pi}{180})\cos(\theta\dfrac{\pi}{180})\sin(\omega\dfrac{\pi}{180})\right)}{
\dfrac{1}{\pi}\left(90\dfrac{\pi}{180}\sin(0\dfrac{\pi}{180})\sin(0\dfrac{\pi}{180})+\cos(0\dfrac{\pi}{180})\cos(0\dfrac{\pi}{180})\sin(90\dfrac{\pi}{180})\right)}
$$

The denominator simplifies to $\dfrac{1}{\pi}(0 + 1)$, which allows to further simplify the entire equation nicely:

$$
\bar{Q}_R = \omega\dfrac{\pi}{180}\sin(\phi\dfrac{\pi}{180})\sin(\theta\dfrac{\pi}{180})+\cos(\phi\dfrac{\pi}{180})\cos(\theta\dfrac{\pi}{180})\sin(\omega\dfrac{\pi}{180})
$$

Thankfully, the quantities required for this equation were all previously calculated.

# Polar and Tropical Circles
In a world with variable obliquity, these latitudinal markings are less relevant on discussions of climate. They can still be defined however for the day the planet is most tilted (the 500th day, the solstice), where the obliquity is 45º.

These are easily derived. The tropical latitudes are simply the same the obliquity, 45ºN and 45ºS. The polar latitudes are derived from the obliquity subtracted from 90, which is again 45ºN and 45ºS. 

# R Analysis

```R
library(tidyverse)
library(ggplot2)
library(ggpubr)

k = 0.00288
K = 0.02
dpr = 180/pi
rpd = pi/180

dat = data.frame(d = 1:1000) # 1000 days in a year
dat = dat %>%
  mutate( 
    absPrec = case_when( # absolute precessional displacement
      d >= 0 & d < 250 ~ 0,
      d >= 250 & d < 500 ~ k*(d-250)^2,
      d >= 500 & d < 750 ~ (-k*(d-750)^2) + 360,
      d >= 750 & d < 1000 ~ 360)) %>%
  mutate( 
    absSol = (360/1000)*d, # absolute solar angle
    solDisp = abs(absSol - absPrec), # solar displacement angle
    normSolDisp = -(solDisp/90) + 1, # normalized solar displacement factor
    expf = exp(K*(d-500)), # helper exponential
    trueAxial = 45*4*(expf)/((1+expf)^2),
    #trueAxial = 22.5,
    appAxial = normSolDisp*trueAxial
  )

dat2A = dat %>%
  select(d, appAxial) %>%
  rename(dec = appAxial)

dat2B = expand.grid(d = 1:1000,lat = seq(-90,90,by = 5))

dat2 = inner_join(dat2B, dat2A, by = "d") %>%
  mutate(
    wang = -tan(dec*rpd)*tan(lat*rpd),
    dayAngle = acos(pmax(pmin(wang,1.0),-1.0))*dpr,
    dayAngleN = dayAngle/180,
    relInsolation = (dayAngle*rpd*sin(lat*rpd)*sin(dec*rpd) + cos(lat*rpd)*cos(dec*rpd)*sin(dayAngle*rpd))
  )

dat3A = dat2 %>%
  filter(.,d >= 400 & d <= 600) %>%
  group_by(lat) %>%
  summarise(relSoltideInsolation = mean(relInsolation, na.rm = TRUE))

dat3B = dat2 %>%
  filter(.,d <= 250 | d >= 750) %>%
  group_by(lat) %>%
  summarise(relEqnoxInsolation = mean(relInsolation, na.rm = TRUE))

dat3C = dat2 %>%
  filter(.,d == 500) %>%
  group_by(lat) %>%
  summarise(relSolsticeInsolation = mean(relInsolation, na.rm = TRUE))

dat3 = inner_join(dat3A, dat3B, by = "lat") %>%
  inner_join(., dat3C, by = "lat")


# Plots -----------------------------------------------------------------------------
plot1 <-  ggplot(
  dat2, 
  aes(
    x = d, 
    y = lat, 
    fill = relInsolation)) + 
  geom_raster() +
  scale_fill_viridis_c(
    option = "magma",
    breaks = c(2.25,2.0,1.5,1.0,0.5,0),
    limits = c(0, 2.25)) +
  scale_x_continuous(
    breaks = c(1, 250, 400, 500, 600, 750, 1000),
    expand = c(0, 0)) +
  scale_y_continuous(
    breaks = c(-90, -45, 0, 45, 90),
    expand = c(0, 0)) +
  theme_bw() +
  theme(
    panel.grid = element_blank())


plot2 <- ggplot(
  dat3, 
  aes(
    x = lat, 
    y = relEqnoxInsolation)) +
  geom_line(
    size = 1.5) +
  geom_line(
    aes(
      x = lat,
      y = relSoltideInsolation),
    size = 1.5,
    color = "darkred") +
  geom_line(
    aes(
      x = lat,
      y = relSolsticeInsolation),
    size = 1.5,
    color = "red") +
  scale_x_continuous(
    breaks = c(-90, -45, 0, 45, 90)) +
  scale_y_continuous(
    breaks = c(2.25, 2.0,1.75,1.5,1.25,1.1,1.0,0.90,0.75,0.5,0.25,0.10,0),
    limits = c(0.0,2.25),
    expand = c(0,0)
  ) +
  theme_bw()

ggarrange(plot1, plot2, widths = c(1.4,1.0))
```



