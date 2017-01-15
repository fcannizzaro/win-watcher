#include <Windows.h>
#include <Psapi.h>
#include <node.h>

#define MAX 1000

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

/**
* Get Curret Top Process on Windows
*/
void currentProcess(const FunctionCallbackInfo<Value>& args) {
  DWORD pid = 0x0;
  TCHAR exe[MAX];
  GetWindowThreadProcessId(GetForegroundWindow(), &pid);
  GetProcessImageFileName(OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, pid), exe, MAX);
  args.GetReturnValue().Set(String::NewFromUtf8(args.GetIsolate(), exe));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "currentProcess", currentProcess);
}

NODE_MODULE(addon, init)
