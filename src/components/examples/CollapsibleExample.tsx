import Collapsible, { Accordion, NestedCollapsible } from '../common/Collapsible';
import { FileText, Settings, HelpCircle, Users, BookOpen, FolderOpen, File } from 'lucide-react';

export default function CollapsibleExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Collapsible Examples</h2>
        
        {/* Basic Collapsible */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Collapsible</h3>
          <Collapsible title="Click to expand">
            <p className="text-base-content/70">
              This is the content inside the collapsible. It can contain any React elements.
            </p>
          </Collapsible>

          <Collapsible 
            title="With Icon" 
            icon={<FileText className="w-5 h-5" />}
            defaultOpen
          >
            <p className="text-base-content/70">
              This collapsible has an icon and is open by default.
            </p>
          </Collapsible>
        </div>

        {/* Variants */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Variants</h3>
          
          <Collapsible title="Default Variant" variant="default">
            <p className="text-base-content/70">Default style collapsible</p>
          </Collapsible>

          <Collapsible title="Bordered Variant" variant="bordered">
            <p className="text-base-content/70">Bordered style with hover effects</p>
          </Collapsible>

          <Collapsible title="Ghost Variant" variant="ghost">
            <p className="text-base-content/70">Transparent background style</p>
          </Collapsible>

          <Collapsible title="Filled Variant" variant="filled">
            <p className="text-base-content/70">Filled background style</p>
          </Collapsible>
        </div>

        {/* Sizes */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Sizes</h3>
          
          <Collapsible title="Small Size" size="sm" variant="bordered">
            <p className="text-base-content/70">Compact size for tight spaces</p>
          </Collapsible>

          <Collapsible title="Medium Size" size="md" variant="bordered">
            <p className="text-base-content/70">Default medium size</p>
          </Collapsible>

          <Collapsible title="Large Size" size="lg" variant="bordered">
            <p className="text-base-content/70">Larger size for emphasis</p>
          </Collapsible>
        </div>

        {/* Accordion Group */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Accordion (Single Open)</h3>
          <Accordion
            items={[
              {
                id: '1',
                title: 'Getting Started',
                icon: <BookOpen className="w-5 h-5" />,
                content: (
                  <div>
                    <p className="text-base-content/70 mb-2">
                      Learn the basics of using this component.
                    </p>
                    <ul className="list-disc list-inside text-sm text-base-content/60">
                      <li>Installation</li>
                      <li>Basic usage</li>
                      <li>Configuration</li>
                    </ul>
                  </div>
                ),
              },
              {
                id: '2',
                title: 'Configuration',
                icon: <Settings className="w-5 h-5" />,
                content: (
                  <p className="text-base-content/70">
                    Configure the component to match your needs with various props and options.
                  </p>
                ),
              },
              {
                id: '3',
                title: 'FAQ',
                icon: <HelpCircle className="w-5 h-5" />,
                content: (
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Q: How do I use this?</p>
                      <p className="text-sm text-base-content/60">A: Import and use like any React component.</p>
                    </div>
                    <div>
                      <p className="font-medium">Q: Is it accessible?</p>
                      <p className="text-sm text-base-content/60">A: Yes, with proper ARIA attributes.</p>
                    </div>
                  </div>
                ),
              },
            ]}
            variant="bordered"
          />
        </div>

        {/* Multiple Open Accordion */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Accordion (Multiple Open)</h3>
          <Accordion
            items={[
              {
                id: 'users',
                title: 'User Management',
                icon: <Users className="w-5 h-5" />,
                content: <p className="text-base-content/70">Manage users, roles, and permissions.</p>,
              },
              {
                id: 'content',
                title: 'Content Management',
                icon: <FileText className="w-5 h-5" />,
                content: <p className="text-base-content/70">Create and edit content.</p>,
              },
              {
                id: 'settings',
                title: 'System Settings',
                icon: <Settings className="w-5 h-5" />,
                content: <p className="text-base-content/70">Configure system preferences.</p>,
              },
            ]}
            allowMultiple
            defaultOpenIds={['users']}
            variant="filled"
          />
        </div>

        {/* Nested Collapsible (Tree View) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Nested Collapsible (Tree View)</h3>
          <div className="bg-base-100 rounded-xl p-4 border border-base-300">
            <NestedCollapsible
              title="src"
              icon={<FolderOpen className="w-4 h-4" />}
              defaultOpen
            >
              <NestedCollapsible
                title="components"
                icon={<FolderOpen className="w-4 h-4" />}
                level={1}
                defaultOpen
              >
                <NestedCollapsible
                  title="common"
                  icon={<FolderOpen className="w-4 h-4" />}
                  level={2}
                >
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-2 p-1 text-sm text-base-content/70">
                      <File className="w-3 h-3" />
                      <span>Button.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 p-1 text-sm text-base-content/70">
                      <File className="w-3 h-3" />
                      <span>Input.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 p-1 text-sm text-base-content/70">
                      <File className="w-3 h-3" />
                      <span>Modal.tsx</span>
                    </div>
                  </div>
                </NestedCollapsible>
                <NestedCollapsible
                  title="ui"
                  icon={<FolderOpen className="w-4 h-4" />}
                  level={2}
                >
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-2 p-1 text-sm text-base-content/70">
                      <File className="w-3 h-3" />
                      <span>LoginForm.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 p-1 text-sm text-base-content/70">
                      <File className="w-3 h-3" />
                      <span>UserMenu.tsx</span>
                    </div>
                  </div>
                </NestedCollapsible>
              </NestedCollapsible>
              <div className="ml-4 flex items-center gap-2 p-1 text-sm text-base-content/70">
                <File className="w-3 h-3" />
                <span>App.tsx</span>
              </div>
            </NestedCollapsible>
          </div>
        </div>
      </div>
    </div>
  );
}
