---
title: Dynamic Helm Configuration with Lua Scripts
description: Enhance Helm deployments with dynamic configuration by using Lua scripts
---

When luaScript is present and non-empty A Go library for processing Lua scripts generating structured output in the format:

```json
{
  "values": {
    "key": "value"
  },
  "valuesFiles": ["file1.txt", "file2.json"]
}
```
The full Helm release is rendered using this merged configuration.

## Security Architecture

The Lua execution environment follows the principle of the least privilege by:

1. **Selective Library Loading**: Only essential, safe standard libraries are loaded
2. **Custom Module Control**: All additional functionality is provided through controlled custom modules
3. **Restricted File Access**: File operations are confined to a specified base directory

## Lua Modules

### Encoding Module

The encoding module provides functions for JSON and YAML serialization.

#### Functions

##### `encoding.jsonEncode(value) -> string`
Converts a Lua value to JSON string.

```lua
local data = {name = "John", age = 30}
local jsonStr = encoding.jsonEncode(data)
-- Result: '{"age":30,"name":"John"}'
```

##### `encoding.jsonDecode(jsonString) -> value`
Parses a JSON string into a Lua value.

```lua
local jsonStr = '{"name":"Alice","age":25}'
local data = encoding.jsonDecode(jsonStr)
-- Result: {name = "Alice", age = 25}
```

##### `encoding.yamlEncode(value) -> string`
Converts a Lua value to YAML string.

```lua
local data = {
    user = {
        name = "Bob",
        roles = {"admin", "user"}
    }
}
local yamlStr = encoding.yamlEncode(data)
```

##### `encoding.yamlDecode(yamlString) -> value`
Parses a YAML string into a Lua value.

```lua
local yamlStr = [[
user:
  name: Charlie
  active: true
]]
local data = encoding.yamlDecode(yamlStr)
-- Result: {user = {name = "Charlie", active = true}}
```

### File System Module

The fs module provides secure file operations within a restricted base directory.

#### Security Features

- **Path traversal prevention**: Blocks attempts to access files outside the base directory
- **Base directory restriction**: All file operations are confined to a specified directory
- **Input validation**: Cleans and validates all file paths

#### Functions

##### `fs.read(filePath) -> string`
Reads the entire contents of a file as a string.

```lua
local content = fs.read("config.json")
if content then
    local config = encoding.jsonDecode(content)
    values["config"] = config
end
```

**Parameters:**
- `filePath` (string): Relative path to the file within the base directory

**Returns:**
- `string`: File contents, or `nil` and error message on failure

##### `fs.walk(directory) -> [string]`
Returns a list of all files within the specified directory and its subdirectories.

```lua
local files = fs.walk(".")
if files then
    values["allFiles"] = files
end
```

**Parameters:**
- `directory` (string): Relative path to the directory within the base directory

**Returns:**
- `[string]`: Array of relative file paths, or `nil` and error message on failure


## Basic Usage

### Simple Values Assignment

```lua
-- Basic value assignment
values = {}
values["appName"] = "MyApplication"
values["version"] = "1.2.3"
values["debug"] = true
values["maxConnections"] = 100

-- File references
valuesFiles = {"config.json", "secrets.yaml"}
```

### Nested Data Structures

```lua
-- Complex nested structure
values = {}
values["database"] = {
    host = "localhost",
    port = 5432,
    credentials = {
        username = "admin",
        passwordFile = "db-password.txt"
    },
    pools = {
        {name = "read", size = 10},
        {name = "write", size = 5}
    }
}

values["features"] = {
    authentication = true,
    logging = true,
    metrics = false
}

valuesFiles = {
    "database/schema.sql",
    "database/migrations/001_initial.sql",
    "config/app.yaml"
}
```
### Arrays and Lists

```lua
-- Working with arrays
values = {}

-- Simple array
values["environments"] = {"development", "staging", "production"}

-- Array of objects
values["services"] = {
    {name = "web", port = 8080, replicas = 3},
    {name = "api", port = 8081, replicas = 2},
    {name = "worker", port = 8082, replicas = 1}
}

-- Mixed array
values["mixed"] = {"string", 42, true, {nested = "object"}}
```

## File Operations

### Reading Configuration Files

```lua
-- Read and parse JSON configuration
local configContent = fs.read("config.json")
if configContent then
    local config = encoding.jsonDecode(configContent)
    if config then
        values["serverConfig"] = config
        values["port"] = config.server.port
        values["host"] = config.server.host
    else
        values["configError"] = "Failed to parse config.json"
    end
else
    values["configError"] = "Failed to read config.json"
end

-- Read YAML configuration
local yamlContent = fs.read("app.yaml")
if yamlContent then
    local yamlConfig = encoding.yamlDecode(yamlContent)
    if yamlConfig then
        values["appConfig"] = yamlConfig
    end
end
```

### Directory Traversal

```lua
-- List all template files
local templateFiles = fs.walk("templates")
if templateFiles then
    values["templates"] = templateFiles
    
    -- Add template files to valuesFiles for processing
    valuesFiles = {}
    for i, file in ipairs(templateFiles) do
        table.insert(valuesFiles, file)
    end
    
    -- Count files by extension
    local counts = {}
    for i, file in ipairs(templateFiles) do
        local ext = file:match("%.([^%.]+)$")
        if ext then
            counts[ext] = (counts[ext] or 0) + 1
        end
    end
    values["templateCounts"] = counts
end
```

### Conditional File Loading

```lua
-- Load different configs based on environment
local env = "production" -- This could come from environment variable

local configFile = "config-" .. env .. ".json"
local configContent = fs.read(configFile)

if configContent then
    local config = encoding.jsonDecode(configContent)
    values["config"] = config
    values["environment"] = env
else
    -- Fallback to default config
    local defaultConfig = fs.read("config-default.json")
    if defaultConfig then
        values["config"] = encoding.jsonDecode(defaultConfig)
        values["environment"] = "default"
    end
end

valuesFiles = {configFile}
```

## Encoding Operations

### JSON Processing

```lua
-- Create complex data structure
local appData = {
    metadata = {
        name = "MyApp",
        version = "2.0.0",
        authors = {"Alice", "Bob"},
        license = "MIT"
    },
    dependencies = {
        {name = "express", version = "^4.18.0"},
        {name = "lodash", version = "^4.17.21"}
    },
    scripts = {
        start = "node server.js",
        test = "jest",
        build = "webpack --mode=production"
    }
}

-- Convert to JSON
local jsonString = encoding.jsonEncode(appData)
values["packageJson"] = jsonString

-- Parse it back to verify
local parsed = encoding.jsonDecode(jsonString)
values["verification"] = parsed.metadata.name == "MyApp"
```

### YAML Processing

```lua
-- Create Kubernetes-style configuration
local k8sConfig = {
    apiVersion = "apps/v1",
    kind = "Deployment",
    metadata = {
        name = "my-app",
        labels = {
            app = "my-app",
            version = "v1"
        }
    },
    spec = {
        replicas = 3,
        selector = {
            matchLabels = {
                app = "my-app"
            }
        },
        template = {
            metadata = {
                labels = {
                    app = "my-app"
                }
            },
            spec = {
                containers = {
                    {
                        name = "app",
                        image = "my-app:latest",
                        ports = {
                            {containerPort = 8080}
                        }
                    }
                }
            }
        }
    }
}

-- Convert to YAML
local yamlString = encoding.yamlEncode(k8sConfig)
values["deploymentYaml"] = yamlString

-- Store as file reference
valuesFiles = {"deployment.yaml"}
```
