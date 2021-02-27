# Zone Redirect

Quick and dirty drop in redirector, redirects to a different url/lovelace dashboard based on current user zone. Add the configuration directly to the root of your lovelace configuration

## Configuration options

The root ```zone_redirect:``` should contain an array of redirect definitions

| Name | Type | Description |
|-|-|-|
| ```zones``` | ```array``` | A list of zones to check the user against. |
| ```users``` | ```array``` | A list of users for which this redirect will occur is they are in any of the defined zones. |
| ```path``` | ```string``` | The relative URL to redirect to. |

## Example

```yaml
zone_redirect:
  - path: "/lovelace-shoppinglist" 
    zones:
      - zone.grocery_store_1
      - zone.grocery_store_2
    users:
      - person.john
      - person.jane
  - path: "/lovelace-alarm"
    zones:
      - zone.work
    users:
      - person.john
```